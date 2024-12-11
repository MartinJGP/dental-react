import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate,Link} from "react-router-dom";
import {isAuthenticated} from "./Config/auth";
import logo from "./assets/images/logo.png";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, );

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar el mensaje de error

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://dental-tcdg.onrender.com/login', formData);
            if (response.status === 200) {
                localStorage.setItem('rol', response.data.Roles[0].authority);
                localStorage.setItem('token', response.data.token);
                navigate('/')
            }
        } catch (error) {
            // Mostrar un mensaje de error
            setErrorMessage('Usuario Incorrecto');
            localStorage.removeItem('token');
            Swal.fire({
                title: 'Usuario no encontrador, intente nuevamente',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            } ).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            })
        }
    };
    const handlexd= async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Por el momento no se puede cambiar la contraseña por favor contacte con nosostros\nWhatsapp: 987654321',
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        } );
    }

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img
                                                src={logo}
                                                style={{ width: '230px', height: '100px' }}
                                                alt="logo"
                                            />

                                        </div>
                                        <form onSubmit={handleLogin}>
                                            <p style={{fontSize:"18px",marginTop:"20px"}}><strong>Ingrese tu cuenta</strong></p>
                                            <hr/>
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
                                                />

                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                    type="submit"
                                                >
                                                    Iniciar Sesion
                                                </button>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">No tienes una Cuenta?</p>
                                                <Link to={"/regUsuarios"} className="btn btn-outline-danger">
                                                    Registrarse
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">Clinica Dental La Merced: Calidad al alcance de su economia</h4>
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

export default Login;
