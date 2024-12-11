import logo from '../assets/images/logo.png';
const Error403 = () => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 text-center">
                    <img src={logo} alt="Logo de Clínica Dental" className="img-fluid mb-4" style={{maxWidth:500}}/>
                    <strong><h1 className="display-4">Error 403</h1></strong>
                        <p className="lead">Acceso Prohibido</p>
                        <p>No tienes los permisos necesarios para acceder a esta página.</p>
                        <p>Si eres administrador, inicia sesión para obtener acceso. De lo contrario, puedes regresar a nuestra <strong><a href="/" style={{textDecoration:"none",color:"darkorange",fontSize:18}}> Página de inicio</a></strong>.</p>
                </div>
            </div>
        </div>
    )
}
export default Error403;