import React, {useEffect, useState} from 'react';
import {isAuthenticated, cerrarSesion, obtenerusername, isRoleAdmin, isRoleUser, getUser} from './Config/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faWhatsapp, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import logo from './assets/images/logo.png';
import SliderMenu from "./assets/SliderMenu";
import "./assets/styles/menu.css";
import orto from "./assets/images/especialidades/ortodoncia.jpg";
import estec from "./assets/images/especialidades/estetica.jpg";
import endo from "./assets/images/especialidades/Endodoncia.jpg";
import perio from "./assets/images/especialidades/Periodoncia.png";
import impla from "./assets/images/especialidades/implantes.png";
import protes from "./assets/images/especialidades/protesis-dentales.jpg";
import pedi from "./assets/images/especialidades/Odontopediatria.jpg";
import integral from "./assets/images/especialidades/integral.jpg";
import radio from "./assets/images/especialidades/radiografia.jpg";
import AtencionMenu from "./assets/AtencionMenu";
import {mostraralerta} from "./AlertasVarios/Alterts";
import FooterMenu from "./assets/FooterMenu";


const Menu = () => {
    const logeado = isAuthenticated();
    const admin=isRoleAdmin();
    const user=isRoleUser();

    // botoncito
    const [showToTopButton, setShowToTopButton] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowToTopButton(true);
        } else {
            setShowToTopButton(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, );
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    // fin de botoncit


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container d-flex justify-content-between">
                    <div className="navbar-nav">
                        <img src={logo} alt="" style={{ maxWidth: 200 }} />
                        <a className="navbar-brand mt-3 "  style={{ fontSize: 22, marginLeft: 30 }}>

                        </a>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" >
                        <ul className="navbar-nav" style={{marginRight:100}}>
                            <li className="nav-item">
                                <a className="nav-link" href="#Inicio" style={{ fontSize: 20 }}>
                                    <strong>Inicio</strong>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#Tratamientos" style={{ fontSize: 20, marginLeft: 30 }}>
                                    <strong>Tratamientos</strong>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#Contacto" style={{ fontSize: 20, marginLeft: 30 }}>
                                    <strong>Contacto</strong>
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
            <div>
                {/* Sección de Inicio */}
                <SliderMenu/>
            </div>
            <h1 className="text-center my-5" >Bienvenido(a)&nbsp;{obtenerusername()}</h1>
            <div>
                <section className="bg-light p-5 text-center" id={"Inicio"}>
                    <div className="row d-flex justify-content-center align-items-center" style={{ flexDirection: 'row' }}>
                        <div className="col-lg-6 d-flex justify-content-center ">
                            <div>

                                <h2>Nos importa tu salud y la de tu familia</h2>
                                <p>
                                    Clínica Dental Monterrico es una empresa con más de 20 años de experiencia Odontológica, brindado calidad en el servicio.

                                    Actualmente contamos con cuatro sedes que están ubicados estratégicamente en las zonas de mayor dinámica comercial de Lima Este.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img
                                decoding="async"
                                width="500"
                                height="700"
                                src="https://clinicamonterrico.com.pe/wp-content/uploads/2015/12/quienes-somos-original.jpg"
                                className="attachment-full size-full wp-image-65"
                                alt="Odontologos Dental La Merced"
                                srcSet="https://clinicamonterrico.com.pe/wp-content/uploads/2015/12/quienes-somos-original.jpg 500w, https://clinicamonterrico.com.pe/wp-content/uploads/2015/12/quienes-somos-original.jpg 214w"
                                sizes="(max-width: 500px) 100vw, 500px"
                            />
                        </div>
                    </div>
                </section>

                <section id="Tratamientos" className="tratamiento">
                    <div className="contenido-seccion">
                        <h2>Tratamientos</h2>
                        <p align="center">Somos especialistas con amplia experiencia en cada uno de ellos</p>
                        <div className="galeria">
                            <div className="proyecto">
                                <img className="img-d" src={orto} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Ortodoncia")}>
                                    <h3>Ortodoncia</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto" >
                                <img className="img-d" src={estec} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Estetica Dental")}>
                                    <h3>Estetica Dental</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto">
                                <img className="img-d" src={endo} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Endodoncia")}>
                                    <h3>Endodoncia</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto">
                                <img className="img-d" src={perio} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Periodoncia")}>
                                    <h3>Periodoncia</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto">
                                <img className="img-d" src={impla} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Implantes dentales")}>
                                    <h3>Implantes dentales</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto">
                                <img className="img-d" src={protes} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Prótesis dental")}>
                                    <h3>Prótesis dental</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto">
                                <img className="img-d" src={pedi} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Odontopediatría")}>
                                    <h3>Odontopediatría</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto">
                                <img className="img-d" src={integral} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Odontología Integral")}>
                                    <h3>Odontología Integral</h3>
                                    <p>Mas detalles</p>
                                </div>
                            </div>
                            <div className="proyecto">
                                <img className="img-d" src={radio} alt=""/>
                                <div className="overlay" onClick={()=>mostraralerta("Radiografías dentales")}>
                                    <h3>Radiografías dentales</h3>
                                    <p >Mas detalles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                <div id={"Contacto"}>
                    <br/>
                    <br/>
                </div>
                <section className="py-5 text-center"  >
                    <div className="container h-100">
                        <div className="row h-100 justify-content-center align-items-center">
                            <div className="col-6">
                                <h2>Contactanos</h2>
                                <form>
                                    <div className="d-flex justify-content-center">
                                        <a href="https://www.facebook.com/profile.php?id=100075541388478" target={"_blank"} rel={"noreferrer"} className="btn  m-2" style={{backgroundColor:"#2464ee"}}>
                                            <FontAwesomeIcon icon={faFacebook} /> Facebook
                                        </a>
                                        <a href="https://wa.link/wzcgkk" target={"_blank"} rel={"noreferrer"} className="btn  m-2" style={{backgroundColor:"#2464ee"}}>
                                            <FontAwesomeIcon icon={faWhatsapp} /> Whatsapp
                                        </a>
                                        <a href="https://www.instagram.com/clinicamonterrico/" target={"_blank"} rel={"noreferrer"} className="btn m-2" style={{backgroundColor:"#2464ee"}}>
                                            <FontAwesomeIcon icon={faInstagram} /> Instagram
                                        </a>
                                        <a href="https://www.tiktok.com/@clinicamonterrico" target={"_blank"} rel={"noreferrer"} className="btn  m-2" style={{backgroundColor:"#2464ee"}}>
                                            <FontAwesomeIcon icon={faTiktok} /> TikTok
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-5 text-center" >

                    <AtencionMenu/>

                </section>


                <section className="py-5 text-center">
                    <div className="container">
                        <h2>Ubicación</h2>
                        <p>
                            Dirección de la clínica dental: <br />
                            123 Calle Principal, Ciudad, País
                        </p>
                        {/* Agregar un mapa de Google aquí si es necesario */}
                        <div style={{ width: '100%', maxHeight:"600px", margin: '0 auto' }}>
                            <div style={{ position: 'relative', paddingBottom: '75%' /* Proporción del aspecto del mapa (4:3) */ }}>
                                <iframe
                                    title="Ubicación"
                                    width="100%"
                                    height="100%"
                                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '600px'}}
                                    frameBorder="0"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.134099582702!2d-76.97642102388316!3d-12.102970942952009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7a29566182b%3A0x4c539b07e2149dcd!2sCl%C3%ADnica%20Monterrico!5e0!3m2!1ses-419!2spe!4v1730382514929!5m2!1ses-419!2spe"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div>
                <FooterMenu/>
            </div>
            <div className="text-center p-4" style={{background: 'rgba(0, 0, 0, 0.2)', borderTop: "1px solid #000"}}>
                © 2024 Clinica Dental Monterrico
            </div>
            <button
                className={`btn btn-outline to-top-button ${showToTopButton ? "show" : ""}`}
                onClick={scrollToTop}>Ir arriba</button>

        </div>

        //Body

    );
};

export default Menu;