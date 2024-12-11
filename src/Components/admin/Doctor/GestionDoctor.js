import {useEffect, useState} from "react";
import {isRoleAdmin, returnToken} from "../../Config/auth";
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../../NavBar";

const GestionDoctor = () => {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (!isRoleAdmin()) {
            window.location.href = '/error403';
        }
        // Llama a la API para obtener la lista de doctores.
        axios.get('https://dental-tcdg.onrender.com/api/doctor/getall', returnToken())
            .then((response) => setDoctors(response.data))
            .catch((error) => console.error('Error fetching doctors:', error));
    }, []);
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro de que deseas eliminar este elemento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`https://dental-tcdg.onrender.com/api/doctor/delete/${id}`, returnToken());
                if (response.status === 200) {
                    await Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error:', error);
                await Swal.fire('Error', 'Hubo un problema al eliminar el elemento.', 'error');
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await Swal.fire('Cancelado', 'El elemento no ha sido eliminado.', 'error');
        }
    };


        return (
            <div>
                <NavBar/>
        <div className="container mt-5" style={{ marginTop: "150px" }}>
            <h2>Gestión de Doctores</h2>
            <br/>
            <Link to={"/admin/doctors/reg"} className="btn btn-success">Registrar Nuevo Doctor</Link>
            <hr />
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Código Interno</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th >Acciones</th>
                </tr>
                </thead>
                <tbody>
                {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.codigointerno}</td>
                        <td>{doctor.nombres}</td>
                        <td>{doctor.apellidos}</td>
                        <td>{doctor.telefono}</td>
                        <td>{doctor.email}</td>
                        <td colSpan={2}>
                            <Link to={`/admin/doctors/edit/${doctor.id}`} className="btn btn-primary " >Editar</Link>
                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(doctor.id)}>Eliminar</button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
            </div>
    )
}
export default GestionDoctor;