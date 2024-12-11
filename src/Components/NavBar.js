import logo from "./assets/images/logo.png";
import {cerrarSesion, isAuthenticated, isRoleAdmin, isRoleUser, obtenerusername} from "./Config/auth";
import React from "react";

const NavBar = () => {
    const logeado = isAuthenticated();
    const admin=isRoleAdmin();
    const user=isRoleUser();
  return (
      <div style={{marginBottom:150}}>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top" >
          <div className="container d-flex justify-content-between">
              <div className="navbar-nav">
                  <img src={logo} alt="" style={{ maxWidth: 200 }} />
                  <a className="navbar-brand mt-2 "  style={{ fontSize: 25, marginLeft: 30 }}>

                  </a>
              </div>
              <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <a className="nav-link" href="/" style={{ fontSize: 20 }}>
                              <strong>Inicio</strong>
                          </a>
                        </li>
                  </ul>
                  {/*Es Admin?*/}
                  {!admin ? null : (
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <a className="nav-link" href="/admin" style={{ fontSize: 20 }}>
                                  <strong>Gestion Administracion</strong>
                              </a>
                          </li>
                      </ul>
                  )}
                  {/*Es Usuario normal?*/}
                  {!user ? null : (
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <a className="nav-link" href="/user/citas" style={{ fontSize: 20 }}>
                                  <strong>Citas</strong>
                              </a>
                          </li>
                      </ul>
                  )}
                  {!user ? null : (
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <a className="nav-link" href="/user/edit" style={{ fontSize: 20 }}>
                                  <strong>Editar Datos</strong>
                              </a>
                          </li>
                      </ul>
                  )}
                  {/*Esta Logeado?*/}
                  {logeado ? (
                      <ul className="navbar-nav ml-auto-custom">
                          <li className="nav-item">
                              <button className="btn btn-outline-danger" onClick={cerrarSesion}>
                                  Cerrar Sesión
                              </button>
                          </li>
                      </ul>
                  ) : (
                      <ul className="navbar-nav ml-auto-custom">
                          <li className="nav-item">
                              <a className="nav-link" href="/login" style={{ fontSize: 20 }}>
                                  <strong>Logearse</strong>
                              </a>
                          </li>
                      </ul>
                  )}
              </div>
          </div>
      </nav>
      </div>
  );
}
export default NavBar;