import {getUser, returnToken} from "../Config/auth";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import NavBar from "../NavBar";
import {Link} from "react-router-dom";

const EditarContra = () => {
    const [contrasena, setContrasena] = useState("");
    const [contrasenaAntigua, setContrasenaAntigua] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [repetirNuevaContrasena, setRepetirNuevaContrasena] = useState("");
    const [id, setId] = useState("")


    //show password
    const [showContrasenaAntigua, setShowContrasenaAntigua] = useState(false);
    const [showNuevaContrasena, setShowNuevaContrasena] = useState(false);
    const [showRepetirNuevaContrasena, setShowRepetirNuevaContrasena] = useState(false);

    useEffect(() => {
        returnContrasena().then((data) => {
            if (data === undefined) {
                window.location.href = "/login";
            }
            setContrasena(data.password);
            setId(data.id);
        });
    }, [contrasena]);
    const returnContrasena = async () => {
        return getUser().catch();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contrasenaAntigua, nuevaContrasena, repetirNuevaContrasena,id)
        if (nuevaContrasena !== repetirNuevaContrasena) {
            await Swal.fire({
                title: 'La nueva contraseña no coincide',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
            return;
        }
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`http://localhost:8080/api/changePassword?password=${contrasenaAntigua}&newpassword=${nuevaContrasena}&id=${id}`,requestOptions);
        if (response.status===200){
            await Swal.fire({
                title: 'Contraseña cambiada con éxito',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
            window.location.href = "/user/edit";
        }else {
            await Swal.fire({
                title: 'Contraseña actual incorrecta',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
        }
    }

    return (
        <div>
            <NavBar/>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header ">
                        <h2 className="mb-0">Cambiar Contraseña</h2>
                    </div>
                    <div className="card-body">
                        <hr/>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="contraseñaAntigua" className="form-label">Contraseña Actual</label>
                                <div className="input-group">
                                    <input
                                        type={showContrasenaAntigua ? "text" : "password"}
                                        className="form-control"
                                        id="contraseñaAntigua"
                                        placeholder="Ingrese Contraseña Actual"
                                        value={contrasenaAntigua}
                                        onChange={(e) => setContrasenaAntigua(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowContrasenaAntigua(!showContrasenaAntigua)}>
                                        {showContrasenaAntigua ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="nuevaContraseña" className="form-label">Nueva Contraseña</label>
                                <div className="input-group">
                                    <input
                                        type={showNuevaContrasena ? "text" : "password"}
                                        className="form-control"
                                        id="nuevaContraseña"
                                        placeholder="Ingrese Nueva Contraseña"
                                        value={nuevaContrasena}
                                        onChange={(e) => setNuevaContrasena(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowNuevaContrasena(!showNuevaContrasena)}>
                                        {showNuevaContrasena ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="repetirNuevaContraseña" className="form-label">Confirmar Nueva Contraseña</label>
                                <div className="input-group">
                                    <input
                                        type={showRepetirNuevaContrasena ? "text" : "password"}
                                        className="form-control"
                                        id="repetirNuevaContraseña"
                                        placeholder="Repita Nueva Contraseña"
                                        value={repetirNuevaContrasena}
                                        onChange={(e) => setRepetirNuevaContrasena(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowRepetirNuevaContrasena(!showRepetirNuevaContrasena)}>
                                        {showRepetirNuevaContrasena ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary me-2">Cambiar Contraseña</button>
                                <Link to={"/user/edit"} className="btn btn-danger">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditarContra