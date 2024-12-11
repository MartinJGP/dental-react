import {useEffect, useState} from "react";
import axios from "axios";
import {isRoleAdmin, returnToken, returnTokenJson} from "../../Config/auth";
import {Link, useParams} from "react-router-dom";
import NavBar from "../../NavBar";
import Swal from "sweetalert2";

function EditarDoctor(){
    const {id} = useParams();
    const [doctor, setDoctor] = useState({
        id: id,
        codigointerno: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        email: '',
        estado:''
    });
    useEffect(() => {
        if (!isRoleAdmin()){
            window.location.href = '/error403';
        }
        async function fetchDoctorData() {
            try {
                const response = await axios.get(`https://dental-tcdg.onrender.com/api/doctor/get/${id}`,returnToken());
                const data = response.data;
                setDoctor(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchDoctorData().then();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...doctor,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response=await axios.put(`https://dental-tcdg.onrender.com/api/doctor/update`, doctor,returnTokenJson());
            const data = response.data;
            if (data.id){
                await Swal.fire({
                    title: 'Doctor '+data.nombres+' Actualizado Correctamente',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                });
                // Realizar alguna acción después de la actualización
                window.location.href = '/admin/doctors';
            }

        } catch (error) {
            // Manejar errores
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-2">Editar datos del Doctor</h1>
                                <p>Ingrese los datos del doctor</p>
                                <hr/>
                                <form onSubmit={handleSubmit} method="post">
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Código Interno:</label>
                                        <input
                                            type="text"
                                            name="id"
                                            value={doctor.id}
                                            onChange={handleChange}
                                            className="form-control"
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label className="form-label">Código Interno:</label>
                                        <input
                                            type="text"
                                            name="codigointerno"
                                            value={doctor.codigointerno}
                                            onChange={handleChange}
                                            className="form-control"
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nombres:</label>
                                        <input
                                            type="text"
                                            name="nombres"
                                            value={doctor.nombres}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Apellidos:</label>
                                        <input
                                            type="text"
                                            name="apellidos"
                                            value={doctor.apellidos}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Teléfono:</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            value={doctor.telefono}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={doctor.email}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <hr/>
                                    <div className="mb-3 d-flex justify-content-start">
                                        <button className="btn btn-primary me-2" type="submit">
                                            Actualizar Doctor
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
}
export default EditarDoctor;