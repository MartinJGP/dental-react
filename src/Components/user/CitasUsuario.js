import {useEffect, useState} from "react";
import { getUserId, isRoleUser, obtenerusername, returnToken} from "../Config/auth";
import NavBar from "../NavBar";
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import VerPdf from "./VerPdf";

const CitasUsuario = () => {

    const [citas, setCitas] = useState([]);
    const username= obtenerusername();
    useEffect(() => {
        if (!isRoleUser()) {
            window.location.href = "/error403";
        }
    }, []);
    useEffect(() => {
        citasbyUser().catch((error) => { console.error('Error al obtener las citas:', error); });
    }, []);
    async function citasbyUser(){
        let id =await getUserId();
        await axios.get(`https://dental-tcdg.onrender.com/api/citas/getbyuser/${id}`, returnToken()).then((response) => {
            setCitas(response.data);
        })
            .catch((error) => {
                console.error('Error al obtener el usuario:', error);
            });
    }
    const mostrarComentario = (comentario) => {
        if (comentario==="" || comentario==null){
            Swal.fire({
                title: 'No hay comentarios',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then(r => console.log(r));
            return;
        }
        Swal.fire({
            title: comentario,
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then(r => console.log(r));
    }

    return (
        <div>
            <NavBar/>
            <div className="container mt-4" style={{ marginTop: "150px" }}>
                <h2>Mis citas</h2>
                <br />
                <Link to="/user/regCitas" className="btn btn-success">
                    Registrar Nueva Cita
                </Link>
                <hr />
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha y Horario</th>
                        <th>Paciente</th>
                        <th>Documento</th>
                        <th>Celular</th>
                        <th>Doctor</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {citas.map((cita) => (
                        <tr key={cita.id}>
                            <td>{cita.id}</td>
                            <td>
                                {cita.horario.fecha} - {`${cita.horario.horaInicio} - ${cita.horario.horaFin}`}
                            </td>
                            <td>{cita.nombresapellidos}</td>
                            <td>{cita.documento}</td>
                            <td>{cita.numeroCelular}</td>
                            <td>{cita.horario.doctor.nombres}</td>
                            <td>{cita.especialidad}</td>
                            <td>
                                <button className="btn btn-info " onClick={()=>mostrarComentario(cita.comentarios)}>Comentario</button>
                            </td>
                            <td>
                                <Link className="btn btn-secondary" to={"/ver-pdf/?id="+cita.id} target={"_blank"}>Info Pago</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CitasUsuario;