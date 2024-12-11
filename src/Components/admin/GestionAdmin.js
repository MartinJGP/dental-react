import {useEffect} from "react";
import {isRoleAdmin} from "../Config/auth";
import React from "react";
import {Link} from "react-router-dom";
import NavBar from "../NavBar";

const GestionAdmin = () => {
    useEffect(() => {
        if (!isRoleAdmin()){
            window.location.href = '/error403';
        }
    }, []);
    return (
        <div>
            <NavBar/>
            <div className="container mt-5" style={{ marginTop: "150px" }}>
                <h2 className="mb-4 ">Panel de Administrador</h2>
                <h5 className={""}>Seleccione la actividad a realizar</h5>
                <hr/>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-md-8 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title fw-bold fs-3">Gestión Doctores</h5>
                                <label>Ver Doctor, Registrar Doctor y Editar Doctor</label>
                                <p></p>
                                <Link to="/admin/doctors" className="btn btn-outline-info">
                                    Ir a la gestión de doctores
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title fw-bold fs-3">Gestión Horarios</h5>
                                <label>Ver Horarios, Registrar Horarios y Editar Horarios</label>
                                <p></p>
                                <Link to="/admin/horarios" className="btn btn-outline-info">
                                    Ir a la gestión de horarios
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title fw-bold fs-3">Gestión Citas</h5>
                                <label>Ver Citas, Registrar Citas y Editar Citas</label>
                                <p></p>
                                <Link to="/admin/citas" className="btn btn-outline-info">
                                    Ir a la gestión de citas
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GestionAdmin;