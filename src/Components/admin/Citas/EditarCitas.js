import NavBar from "../../NavBar";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isRoleAdmin, returnToken, returnTokenJson} from "../../Config/auth";
import axios from "axios";
import Swal from "sweetalert2";

function EditarCitas() {
    const { id } = useParams();
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [fecha, setFecha] = useState('');
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Cambiado a null
    const [cita, setCita] = useState({
        id: id,
        horario: {
            id: ''
        },
        usuario: {
            id: ''
        },
        nombresapellidos: '',
        edad: '',
        numeroCelular: '',
        documento: '',
        especialidad: '',
        comentarios: ''
    });

    useEffect(() => {
        if (!isRoleAdmin()) {
            window.location.href = "/error403";
        }
        async function fetchCitaData() {
            try {
                const response = await axios.get(`http://localhost:8080/api/citas/get/${id}`, returnToken());
                const data = response.data;
                setCita(data);
                setFecha(data.horario.fecha);
                setHorarioSeleccionado(data.horario.id); // Actualizar horarioSeleccionado con el ID
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchCitaData().then();

    }, [id]);

    useEffect(() => {
        if (fecha) {
            axios.get(`http://localhost:8080/api/horario/get/${fecha}`, returnToken())
                .then((response) => {
                    setHorariosDisponibles(response.data);
                })
                .catch((error) => {
                    console.error('Error al obtener los horarios disponibles:', error);
                });
        }
    }, [fecha]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCita({ ...cita, [name]: value });
    }

    const handleHorarioSeleccionado = (horario) => {
        axios.delete(`http://localhost:8080/api/horario/enable/${cita.horario.id}`, returnToken()).then(r => console.log(r));
        setCita({ ...cita, horario: { id: horario.id, fecha: fecha } });
        setHorarioSeleccionado(horario.id); // Actualizar horarioSeleccionado con el ID
    }

    const handleFechaSeleccionada = (fecha) => {
        setFecha(fecha.target.value);
        setHorarioSeleccionado(null); // Reiniciar horarioSeleccionado cuando se cambia la fecha
    }

    const handleUpdate = async (e) => {
        e.preventDefault();


        if (cita.especialidad === "" || cita.especialidad == null) {
            await Swal.fire({
                title: 'Seleccione una especialidad valida',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8080/api/citas/update`, cita, returnTokenJson());
            const data = response.data;
            if (data.id) {
                await Swal.fire({
                    title: 'Cita de ' + data.nombresapellidos + ' Actualizada Correctamente',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                });
                await axios.delete(`http://localhost:8080/api/horario/disable/${cita.horario.id}`, returnToken());
                window.location.href = '/admin/citas';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <NavBar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-4">Editar Cita</h1>
                                <p>Edite los datos de la cita</p>
                                <hr/>
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Id de Cita:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="id"
                                            value={cita.id}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Id de Usuario:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="id_usuario"
                                            value={cita.usuario.id}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Nombres y Apellidos:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombresapellidos"
                                            value={cita.nombresapellidos}
                                            onChange={handleChange}
                                        />
                                    </div>
                            <div className="mb-3 form-group">
                                <label className="form-label">Edad:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="edad"
                                    value={cita.edad}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label">Número de Celular:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="numeroCelular"
                                    value={cita.numeroCelular}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label">Documento:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="documento"
                                    value={cita.documento}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label">Especialidad:</label>
                                <select
                                    className="form-select"
                                    name="especialidad"
                                    value={cita.especialidad}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una especialidad</option>
                                    <option value="Odontologia Integral">Odontologia Integral</option>
                                    <option value="Ortodoncia">Ortodoncia</option>
                                    <option value="Estetica Dental">Estetica Dental</option>
                                    <option value="Endodoncia">Endodoncia</option>
                                    <option value="Periodoncia">Periodoncia</option>
                                    <option value="Implantes Dentales">Implantes Dentales</option>
                                    <option value="Protesis Dental">Protesis Dental</option>
                                    <option value="Odontopediatria">Odontopediatria</option>
                                    <option value="Radiografia Dental">Radiografia Dental</option>
                                    {/* Agrega más opciones de especialidades según tus necesidades */}
                                </select>
                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label">Comentarios:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="comentarios"
                                    value={cita.comentarios}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label">Fecha:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha"
                                    value={fecha}
                                    onChange={handleFechaSeleccionada}
                                />
                            </div>
                                    {/* Agrega el resto de los campos del formulario de registro aquí */}
                                    <div className="mb-4">
                                        <label className="col-md-3 col-form-label">Horarios Disponibles: </label>
                                        <div className="row">
                                            {horariosDisponibles.map((horario) => (
                                                <div
                                                    key={horario.id}
                                                    className={`col-md-4 mb-3 ${horario.habilitado ? '' : 'deshabilitado'}`}
                                                >
                                                    <button
                                                        type="button"
                                                        className={`card cursor-pointer ${
                                                            horarioSeleccionado === horario.id ? 'seleccionado' : ''
                                                        }`}
                                                        onClick={() => handleHorarioSeleccionado(horario)}
                                                    >
                                                        <div className="card-body">
                                                            <h5 className="card-title">Horario</h5>
                                                            <p className="card-text">{horario.horaInicio} - {horario.horaFin}</p>
                                                            <p className="card-text">Doctor: {horario.doctor.nombres}</p>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-3 d-flex justify-content-start">
                                        <button className="btn btn-primary me-2" type="submit">
                                            Actualizar Cita
                                        </button>
                                        <Link to="/admin/citas" className="btn btn-danger mx-3">
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

export default EditarCitas;