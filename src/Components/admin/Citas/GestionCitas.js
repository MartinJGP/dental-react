import {useEffect, useState} from "react";
import axios from "axios";
import {isRoleAdmin, returnToken, returnTokenJson} from "../../Config/auth";
import NavBar from "../../NavBar";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const GestionCitas = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        if (!isRoleAdmin()) {
            window.location.href = "/error403";
        }
        // Llamar al API para obtener todas las citas
        axios.get('https://dental-tcdg.onrender.com/api/citas/getall',returnToken())
            .then((response) => {
                setCitas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las citas:', error);
            });
    }, []);
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

    // Función para eliminar una cita
    const handleEliminarCita = async (citaId) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar la cita?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Llamar al API para eliminar la cita
                // Realizar una solicitud al API para eliminar la cita
                const responde=await fetch(`https://dental-tcdg.onrender.com/api/citas/cancelar/${citaId}`,{
                    method: 'PUT',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (responde.status===200){
                    await Swal.fire({
                        title: 'Cita cancelada con éxito',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                    });
                    window.location.href = "/admin/citas";
                }
            }else{
                Swal.fire({
                    title: 'No se pudo cancelar la cita',
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                }).then(r => console.log(r));
            }
        });
    };


    return (
        <div>
            <NavBar />
            <div className="container mt-4" style={{ marginTop: "150px" }}>
                <h2>Lista de Citas</h2>
                <br />
                <Link to="/admin/citas/reg" className="btn btn-success">
                    Registrar Nueva Cita
                </Link>
                <hr />
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Fecha y Horario</th>
                            <th>Paciente</th>
                            <th>Documento</th>
                            <th>Celular</th>
                            <th>Doctor</th>
                            <th>Especialidad</th>
                            <th colSpan={4}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.id}</td>
                                <td>{cita.usuario.username}</td>
                                <td>
                                    {cita.horario.fecha} - {`${cita.horario.horaInicio} - ${cita.horario.horaFin}`}
                                </td>
                                <td>{cita.nombresapellidos}</td>
                                <td>{cita.documento}</td>
                                <td>{cita.numeroCelular}</td>
                                <td>{cita.horario.doctor.nombres}</td>
                                <td>{cita.especialidad}</td>
                                <td colSpan={4}>
                                    <div className="btn btn-info" onClick={()=>mostrarComentario(cita.comentarios)}>Comentario</div>
                                    <Link to={`/admin/citas/edit/${cita.id}`} className="btn btn-primary mx-2">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEliminarCita(cita.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default GestionCitas;