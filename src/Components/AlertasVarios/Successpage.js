import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import {returnToken, returnTokenJson} from "../Config/auth";

function SuccessPage() {
    //define  IS_OPEN_FACTOR
    const IS_OPEN_FACTOR = 1.5;
    const [paymentId, setPaymentId] = useState(null);
    const [pago, setPago] = useState({
        descripcion: '',
        fecha: '',
        monto: '',
        id: '',
        status: '',
    });
    const [cita, setCita] = useState(JSON.parse(localStorage.getItem('detallesCita')));
    let citaId = '';
    const url = window.location.href;
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get('payment_id');
    const citaRegistradaRef = useRef(false);
    const pagoRegistradoRef = useRef(false);

    useEffect(() => {
        obtenerPago(id);
    }, []);

    useEffect(() => {
        if (pago.status === 'approved') {
            registrarCita();
        }
    }, [pago]);

    async function obtenerPago(id) {
        try {
            const response = await axios.get(
                `https://dental-tcdg.onrender.com/api/pagos/getpago/${id}`,
                returnToken()
            );
            if (paymentId === null) {
                setPago(response.data);
                setPaymentId(response.data.id);
            }
        } catch (error) {
            console.error('Error al obtener el pago:', error);
            throw error;
        }
    }

    async function registrarCita() {
        if (!citaRegistradaRef.current) {
            citaRegistradaRef.current = true;

            try {
                axios.post(
                    `https://dental-tcdg.onrender.com/api/citas/create`,
                    cita,
                    returnTokenJson()
                ).then((response) => {
                    citaId = response.data.id;
                    axios.delete(`https://dental-tcdg.onrender.com/api/horario/disable/${cita.horario.id}`, returnToken()).then((r) => console.log(r));
                    registrarPago(citaId);
                });
            } catch (error) {
                console.error('Error al registrar la cita:', error);
            }
        }

    }

    async function registrarPago(citaId) {
        if (!pagoRegistradoRef.current) {
            pagoRegistradoRef.current = true;

            try {
                const response = await axios.post(
                    `https://dental-tcdg.onrender.com/api/pagos/create`, {
                        "id": "",
                        "codigo": pago.id,
                        "cita": {
                            "id": citaId
                        },
                        "servicio": pago.descripcion,
                        "monto": pago.monto,
                        "fechaPago": pago.fecha
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response);
            } catch (error) {
                console.error('Error al registrar el pago:', error);
            }
        }

    }

    return (
        <div className="container text-center mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="display-4 text-success mb-0">¡Pago Realizado Correctamente!</h1>
                </div>
                <div className="card-body">
                    <p className="lead">ID de Pago: {paymentId}</p>
                    <p className="lead">Descripción: {pago.descripcion}</p>
                    <p className="lead">Monto: ${pago.monto}</p>
                    <p className="lead">Fecha: {pago.fecha}</p>
                    <p className="lead">Estado: {pago.status}</p>
                </div>
                <div className="card-footer">
                    <Link to="/user/citas" className="btn btn-primary">
                        Volver a Mis Citas
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;

