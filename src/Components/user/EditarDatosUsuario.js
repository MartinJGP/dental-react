import {useEffect, useState} from "react";
import {getUser, isRoleUser} from "../Config/auth";
import NavBar from "../NavBar";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const EditarDatosUsuario = () => {
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
    });


    useEffect(() => {
        if (!isRoleUser()) {
            window.location.href = "/error403";
        }
        // Simulación de carga de datos de usuario, reemplaza esto con tu lógica real
        cargarDatosUsuario().then((data) => {
            setUserData(data);
        });
    }, []);

    const cargarDatosUsuario = async () => {
        // Aquí deberías hacer la llamada a tu función para obtener los datos del usuario
        // Por ahora, simplemente simularemos los datos
        return getUser();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit =async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const data = await fetch('https://dental-tcdg.onrender.com/api/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (data.status === 200) {
                await Swal.fire({
                    title: 'Datos actualizados correctamente',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                });
                window.location.href = "/user/edit";
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <NavBar/>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header ">
                        <h2>Editar Datos de Usuario</h2>
                    </div>
                    <div className="card-body">
                        <hr/>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Nombre de Usuario
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="username"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="phone"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">
                                    Documento
                                </label>
                                <input
                                    type="text"
                                    name="documento"
                                    value={userData.documento}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="documento"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">
                                    <Link to="/user/editarcontra" className="btn btn-outline-secondary my-2">
                                        Cambiar Contraseña
                                    </Link>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditarDatosUsuario;