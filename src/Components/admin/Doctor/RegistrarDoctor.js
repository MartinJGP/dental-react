import {useEffect, useState} from "react";
import {isRoleAdmin,  returnTokenJson} from "../../Config/auth";
import axios from "axios";
import {Link} from "react-router-dom";
import NavBar from "../../NavBar";
import Swal from "sweetalert2";

const RegistrarDoctor = () => {
    useEffect(() => {
        if (!isRoleAdmin()){
            window.location.href = '/error403';
        }
    }, []);

    const [doctor, setDoctor] = useState({
        id: '',
        codigointerno: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        email: '',
        estado:''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDoctor({...doctor, [name]: value});
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response =await axios.post(`https://dental-tcdg.onrender.com/api/doctor/create`, doctor, returnTokenJson());
                const data = response.data;
                if (data.id){
                await Swal.fire({
                    title: 'Doctor '+data.nombres+' Registrado Correctamente',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                });
                window.location.href = '/admin/doctors';
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div>
            <NavBar/>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-4">Registro de Doctor</h1>
                                <p>Ingrese los datos del nuevo doctor</p>
                                <hr/>
                                <form onSubmit={handleRegister}>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Código Interno: (*)</label>
                                        <input
                                            type="text"
                                            name="codigointerno"
                                            value={doctor.codigointerno}
                                            onChange={handleChange}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nombres: (*)</label>
                                        <input
                                            type="text"
                                            name="nombres"
                                            value={doctor.nombres}
                                            onChange={handleChange}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Apellidos: (*)</label>
                                        <input
                                            type="text"
                                            name="apellidos"
                                            value={doctor.apellidos}
                                            onChange={handleChange}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Teléfono: (*)</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            value={doctor.telefono}
                                            onChange={handleChange}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email: (*)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={doctor.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            required={true}
                                        />
                                    </div>
                                    <hr/>
                                    <div className="mb-3 d-flex justify-content-start">
                                        <button className="btn btn-primary me-2" type="submit">
                                            Registrar
                                        </button>
                                        <Link to="/admin/doctors" className="btn btn-danger">
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
export default RegistrarDoctor;