import logo from '../assets/images/logo.png';
const Error404 = () => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 text-center">
                    <img src={logo} alt="Logo de Clínica Dental" className="img-fluid mb-4" style={{maxWidth:500}}/>
                        <strong><h1 className="display-4">Error 404</h1></strong>
                        <p className="lead">Página no encontrada</p>
                        La página que estás buscando no existe. Puedes regresar a nuestra <strong><a href="/" style={{textDecoration:"none",color:"darkorange",fontSize:18}}>Página de inicio</a></strong>.
                    </div>
            </div>
        </div>
    )
}
export default Error404;