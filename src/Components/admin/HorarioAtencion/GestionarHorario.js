import NavBar from "../../NavBar";
import {useEffect, useState} from "react";
import {isRoleAdmin, returnToken} from "../../Config/auth";
import {Link} from "react-router-dom";
import axios from "axios";
import {isDate} from "util";

const GestionarHorario = () => {
    //fecha acutal

    const [horarios, setHorarios] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().slice(0, 10));

    useEffect(() => {
        if (!isRoleAdmin()) {
            window.location.href = '/error403';
        }
    }, []);

    useEffect(() => {
        // Verificar si la fecha seleccionada es válida antes de realizar la solicitud
        if (fechaSeleccionada) {
            axios.get(`https://dental-tcdg.onrender.com/api/horario/get/${fechaSeleccionada}`, returnToken())
                .then((response) => setHorarios(response.data))
                .catch((error) => console.error('Error fetching horarios:', error));
        }
    }, [fechaSeleccionada]); // Ejecutar cuando fechaSeleccionada cambie

    const handleFechaChange = (e) => {
        const nuevaFecha = e.target.value;
        setFechaSeleccionada(nuevaFecha);
    };
    return (
    <div>
        <NavBar />
        <div className="container mt-5" style={{ marginTop: "150px" }}>
            <h2>Gestión de Horarios</h2>
            <br/>
            <Link to={"/admin/horarios/reg"} className="btn btn-success mb-2">Registrar Nuevo Horario</Link>
            <div className="col-2">
                <input
                    type="date"
                    value={fechaSeleccionada}
                    onChange={handleFechaChange}
                    className="form-control"

                />
            </div>
            <hr />
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Hora de Inicio</th>
                    <th>Hora de Fin</th>
                    <th>Estado</th>
                    <th>Id Doctor</th>
                    <th>Nombre Doctor</th>
                    <th >Acciones</th>
                </tr>
                </thead>
                <tbody>
                {horarios.map((horario) => (
                    <tr key={horario.id}>
                        <td>{horario.id}</td>
                        <td>{horario.fecha}</td>
                        <td>{horario.horaInicio}</td>
                        <td>{horario.horaFin}</td>
                        <td>{horario.habilitado ? "Habilitado" : "Deshabilitado"}</td>
                        <td>{horario.doctor.id}</td>
                        <td>{horario.doctor.nombres}</td>
                        <td colSpan={2}>
                            <Link to={`/admin/horarios/edit/${horario.id}`} className="btn btn-primary " >Editar</Link>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
export default GestionarHorario;