import axios from "axios";
import React, {useState} from "react";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import logo from "./assets/images/logo.png";


const RegistrarUsuario = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        phone: "",
        documento: "",
        roles: ["USER"],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const registrarse = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post(
                "https://dental-tcdg.onrender.com/api/createUser",
                formData
            );
            if (response.status === 200) {
                await Swal.fire({
                    title: "Usuario " + response.data.username + " Registrado Correctamente",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                });
                window.location.href = "/login";
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee',overflowY: 'auto', maxHeight: '120vh' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-2 mx-md-4" >
                                        <div className="text-center">
                                            <img
                                                src={logo}
                                                style={{ width: '230px', height: '100px' }}
                                                alt="logo"
                                            />
                                        </div>
                                        <form onSubmit={registrarse}>
                                            <p style={{ fontSize: "18px", marginTop: "20px" }}><strong>Registre sus datos</strong></p>
                                            <hr />
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">
                                                    Nombre de Usuario
                                                </label>
                                                <input
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    required={true}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">
                                                    Email
                                                </label>
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">
                                                    Phone
                                                </label>
                                                <input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">
                                                    Documento de Identidad
                                                </label>
                                                <input
                                                    name="documento"
                                                    value={formData.documento}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">
                                                    Constraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    id="form2Example22"
                                                    className="form-control"
                                                    required={true}
                                                />

                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                    type="submit"
                                                >
                                                    Registrarse
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">¿Ya tienes una cuenta?</p>
                                                <Link to={"/login"} className="btn btn-outline-danger">
                                                    Iniciar Sesion
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">Clínica Dental La Merced: Calidad al alcance de su economía</h4>
                                        <p className="small mb-0">
                                            En La Merced, nuestra misión es trascender más allá de la excelencia dental. Nos dedicamos a crear sonrisas radiantes y salud bucal óptima. En cada consulta, no solo cuidamos de tus dientes, sino que también ofrecemos un ambiente acogedor donde tu bienestar es nuestra prioridad. Descubre la diferencia en el cuidado dental; en La Merced, estamos comprometidos a transformar tu experiencia dental en algo excepcional, brindándote motivos para sonreír con confianza en cada paso de tu viaje hacia una salud oral completa y duradera.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrarUsuario;