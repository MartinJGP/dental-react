import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isRoleAdmin, returnToken, returnTokenJson} from "../../Config/auth";
import axios from "axios";
import NavBar from "../../NavBar";
import Swal from "sweetalert2";

function EditarHorario(){
    const { id } = useParams();

    const [horarioData, setHorarioData] = useState({
        "id": id,
        "fecha": "",
        "horaInicio": "",
        "horaFin": "",
        "habilitado":"",
        "doctor":{
            "id":""
        }
    });

    const [doctores, setDoctores] = useState([]);

    useEffect(() => {
        if (!isRoleAdmin()) {
            window.location.href = "/error403";
        }


        // Obtener los datos del horario con el ID específico
        axios
            .get(`https://dental-tcdg.onrender.com/api/horario/getid/${id}`, returnToken())
            .then((response) => {
                const horario = response.data;
                setHorarioData(horario);
            })
            .catch((error) => {
                console.error("Error al obtener los datos del horario:", error);
            });

        // Obtener la lista de doctores del endpoint
        axios
            .get("https://dental-tcdg.onrender.com/api/doctor/getall", returnToken())
            .then((response) => {
                setDoctores(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener la lista de doctores:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Realizar una copia profunda del objeto horarioData
        const updatedHorarioData = { ...horarioData };

        if (name === "doctor") {
            // Actualizar la propiedad 'id' de 'doctor' en la copia del objeto
            updatedHorarioData.doctor.id = value;
        } else {
            // Actualizar otras propiedades directamente en la copia del objeto
            updatedHorarioData[name] = value;
        }

        // Actualizar el estado 'horarioData' con el nuevo objeto
        setHorarioData(updatedHorarioData);
    };


    const handleEditarHorario = (e) => {
        e.preventDefault();
        // Enviar los datos actualizados a "api/horarios/update"
        axios
            .put(`https://dental-tcdg.onrender.com/api/horario/update`, horarioData, returnTokenJson())
            .then(async (response) => {
                // Realizar acciones posteriores a la actualización si es necesario
                const data = response.data;
                if (data.id) {
                    await Swal.fire({
                        title: 'Horario de ' + data.horaInicio + ' a ' + data.horaFin + ' registrado correctamente',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                    });
                    window.location.href = '/admin/horarios';
                    // Realizar alguna acción después de la actualización
                }
            })
            .catch((error) => {
                console.error("Error al actualizar el horario:", error);
            });
    };
    console.log(horarioData);
    let doctor = horarioData.doctor.id;

    return (
        <div>
            <NavBar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-4">Editar Horario</h1>
                                <form>
                                    <div className="mb-3">
                                        <label>ID:</label>
                                        <input
                                            type="text"
                                            name="id"
                                            value={horarioData.id}
                                            onChange={handleChange}
                                            className="form-control"
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Fecha:</label>
                                        <input
                                            type="date"
                                            name="fecha"
                                            value={horarioData.fecha}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Hora de Inicio:</label>
                                        <input
                                            type="time"
                                            name="horaInicio"
                                            value={horarioData.horaInicio}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Hora de Fin:</label>
                                        <input
                                            type="time"
                                            name="horaFin"
                                            value={horarioData.horaFin}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Doctor:</label>
                                        <select
                                            name="doctor"
                                            value={doctor}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            {doctores.map((doctor) => (
                                                <option key={doctor.id} value={doctor.id}>
                                                    {doctor.nombres}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Estado:</label>
                                        <br />
                                        <span className="text-muted">
                    Verifique que no esté registrado con una cita antes de modificar su estado (*)
                  </span>
                                        <br />
                                        <select
                                            name="habilitado"
                                            value={horarioData.habilitado}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value={true}>Habilitado</option>
                                            <option value={false}>Deshabilitado</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 d-flex justify-content-start">
                                        <button
                                            onClick={handleEditarHorario}
                                            className="btn btn-primary me-2"
                                            type="button"
                                        >
                                            Actualizar Horario
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
}

export default EditarHorario;