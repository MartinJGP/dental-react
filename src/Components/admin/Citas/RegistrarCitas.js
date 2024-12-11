import {useEffect, useState} from "react";
import axios from "axios";
import {getUser, isRoleAdmin, returnToken, returnTokenJson} from "../../Config/auth";
import NavBar from "../../NavBar";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

const RegistroCitas = () => {
    const [fecha, setFecha] = useState('');
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState({});
    const [cita, setCita] = useState({
        horario:{
            id:''
        },
        usuario:{
            id:''
        },
        nombresapellidos:'',
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
        getUser().then(c => setCita({...cita, usuario:{
            id:c.id
            }}));
        if (fecha) {
            axios.get(`https://dental-tcdg.onrender.com/api/horario/get/${fecha}`, returnToken())
                .then((response) => {
                    setHorariosDisponibles(response.data);
                })
                .catch((error) => {
                    console.error('Error al obtener los horarios disponibles:', error);
                });
        }

    }, [fecha]);

    const handleHorarioSeleccionado = (horario) => {
        setHorarioSeleccionado(horario);
        setCita({...cita, horario: {
            id:horario.id
            }});
    };

    const handleRegistroCita = async (e) => {
        e.preventDefault();
        if (cita.especialidad==="" || cita.especialidad==null){
            await Swal.fire({
                title: 'Seleccione una especialidad',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
            return;
        }
            try{
                console.log(cita)
                const response = await axios.post(`https://dental-tcdg.onrender.com/api/citas/create`, cita, returnTokenJson());
                const data = response.data;
                if (data.id){
                    await Swal.fire({
                        title: 'Cita Registrada para el dia: '+horarioSeleccionado.horaInicio+' a las '+horarioSeleccionado.horaFin+' horas',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                    });
                    console.log(cita.horario.id)
                    await axios.delete(`https://dental-tcdg.onrender.com/api/horario/disable/${cita.horario.id}`, returnToken());
                    window.location.href = '/admin/citas';
                }

            }catch (error){
                if (error.response.status === 403){
                    await Swal.fire({
                        title: 'Error',
                        text: 'No se puede registrar la cita, rellene los campos obligarios correctamente',
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                    });

                }
                console.error('Error:', error);
            }

    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCita({...cita, [name]: value});
    }

    return (
        <div>
        <NavBar/>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-4">Registro de Cita</h1>
                                <p>Ingrese los datos para la nueva cita</p>
                                <hr />
                                <form>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Nombres y Apellidos: (*)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombresapellidos"
                                            required={true}
                                            value={cita.nombresapellidos}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Edad: (*)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="edad"
                                            required={true}
                                            value={cita.edad}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Documento de Identidad: (*)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="documento"
                                            required={true}
                                            value={cita.documento}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Número de Celular:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="numeroCelular"
                                            value={cita.numeroCelular}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Especialidad: (*)</label>
                                        <select
                                            className="form-select"
                                            name="especialidad"
                                            required={true}
                                            value={cita.especialidad}
                                            onChange={handleInputChange}
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
                                        <label className="form-label">Comentario:</label>
                                        <textarea
                                            className="form-control"
                                            name="comentarios"
                                            value={cita.comentarios}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="col-md-3 col-form-label">Selecciona una fecha: (*)</label>
                                        <div className="col-md-4">
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={fecha}
                                                required={true}
                                                onChange={(e) => setFecha(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="col-md-3 col-form-label">Seleccione un Horario Disponible: (*)</label>
                                        <div className="row">
                                            {horariosDisponibles.map((horario) => (
                                                <div
                                                    key={horario.id}
                                                    className={`col-md-4 mb-3 ${horario.habilitado ? '' : 'deshabilitado'}`}
                                                >
                                                    <button
                                                        type="button"
                                                        className={`card cursor-pointer ${horarioSeleccionado === horario ? 'seleccionado' : ''}`}
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
                                        <button className="btn btn-primary me-2" type="button" onClick={handleRegistroCita}>
                                            Registrar Cita
                                        </button>
                                        {/* Ajusta la ruta según tus necesidades */}
                                        <Link to="/admin/citas" className="btn btn-danger">
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

export default RegistroCitas;