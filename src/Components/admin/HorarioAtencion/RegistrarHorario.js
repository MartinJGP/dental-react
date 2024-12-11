import NavBar from "../../NavBar";
import {useEffect, useState} from "react";
import {isRoleAdmin, returnToken, returnTokenJson} from "../../Config/auth";
import axios from "axios";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


const RegistrarHorario = () => {
    const [fecha, setFecha] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [doctores, setDoctores] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");


    useEffect(() => {
        if (!isRoleAdmin()) {
            window.location.href = "/error403";
        }
        setFecha(new Date().toISOString().slice(0, 10))
        // Obtener la lista de doctores del endpoint
        axios.get("https://dental-tcdg.onrender.com/api/doctor/getall", returnToken())
            .then((response) => {
                setDoctores(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener la lista de doctores:", error);
            });
    }, []);

    const [horarioData] = useState({
        "fecha": "",
        "horaInicio": "",
        "horaFin": "",
        "doctor": {
            "id":""
            // Aquí debes obtener el ID del doctor seleccionado
        }
    });

    const handleRegistrarHorario = (e) => {
        e.preventDefault();
        // Formatear la fecha y horas como strings
        horarioData.fecha = fecha;
        horarioData.horaInicio = horaInicio;
        horarioData.horaFin = horaFin;
        horarioData.doctor.id = selectedDoctor;
        if (selectedDoctor === "" || selectedDoctor === "") {
            Swal.fire({
                title: 'Seleccione un doctor',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then(r => console.log(r));
            return;
        }
        // Enviar los datos a "api/horarios/create"
        axios.post("https://dental-tcdg.onrender.com/api/horario/create", horarioData, returnTokenJson())
            .then(async (response) => {
                console.log("Horario registrado con éxito:", response.data);
                // Realizar acciones posteriores al registro si es necesario
                const data = response.data;
                if (data.id) {
                    await Swal.fire({
                        title: 'Horario de ' + data.horaInicio + ' a ' + data.horaFin + ' registrado correctamente',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                    });
                }
            }).catch((error) => {
                    console.error("Error al registrar el horario:", error);
                    console.log(horarioData)
                });
            };

    return (
        <div>
            <NavBar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-4">Registro de Horario</h1>
                                <p>Ingrese los datos del nuevo horario</p>
                                <hr />
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="fecha">Fecha: (*)</label>
                                        <input
                                            type="date"
                                            id="fecha"
                                            value={fecha}
                                            onChange={(e) => setFecha(e.target.value)}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="horaInicio">Hora de Inicio: (*)</label>
                                        <input
                                            type="time"
                                            id="horaInicio"
                                            value={horaInicio}
                                            onChange={(e) => setHoraInicio(e.target.value)}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="horaFin">Hora de Fin: (*)</label>
                                        <input
                                            type="time"
                                            id="horaFin"
                                            value={horaFin}
                                            onChange={(e) => setHoraFin(e.target.value)}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="doctor">Doctor: (*)</label>
                                        <select
                                            id="doctor"
                                            value={selectedDoctor}
                                            onChange={(e) => setSelectedDoctor(e.target.value)}
                                            className="form-control"
                                            required={true}
                                        >
                                            <option value="">Seleccione un doctor</option>
                                            {doctores.map((doctor) => (
                                                <option key={doctor.id} value={doctor.id}>
                                                    {doctor.nombres}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex justify-content-start">
                                        <button
                                            onClick={handleRegistrarHorario}
                                            className="btn btn-primary me-2"
                                            type="submit"
                                        >
                                            Registrar
                                        </button>
                                        <Link to="/admin/horarios" className="btn btn-danger">
                                            Cancelar
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default RegistrarHorario;