import foot from './images/footer.jpg'
const FooterMenu = () => {
    return(
        <footer className="text-center text-lg-start text-muted" style={{background: 'rgba(0, 0, 0, 0.15)', margin: 0, padding: 0}}>


            <section  style={{borderTop: "2px solid #000"}}>
                <div className="container text-center text-md-start mt-5" >
                    <div className="row mt-3">

                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fa fa-gem me-3"></i>Clinica Dental Monterrico
                            </h6>
                                <p>
                                    <a href="#Inicio" className="text-reset">Inicio</a>
                                </p>
                                <p>
                                    <a href="#Contacto" className="text-reset">Contacto</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Términos y condiciones</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Política de privacidad</a>
                                </p>
                            <p>
                                No dudes en comunicarte con nosotros.
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                            <h6 className="text-uppercase fw-bold mb-4">Ubicanos</h6>
                            <p className="fw-bold"><i className="fa fa-home me-lg-2 "></i> Direccion:</p>
                            <p>
                                <i className="fa fa-envelope me-3"></i>
                                Carretera Central Santa Clara.
                            </p>
                            <p className="fw-bold"><i className="fa fa-home me-lg-2 "></i> Numeros Telefonicos:</p>
                            <p><i className="fa fa-phone me-3"></i> + 01 234 567 88</p>
                            <p><i className="fa fa-phone me-3"></i> + 51 993 730 231</p>
                            <p><i className="fa fa-phone me-3"></i> + 51 958 587 147</p>
                        </div>

                    </div>

                </div>
            </section>

        </footer>
    )

}
export default FooterMenu;