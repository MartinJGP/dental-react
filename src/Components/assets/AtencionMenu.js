import {ListGroup} from "react-bootstrap";

const atencionMenu = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <ListGroup as="ul" className="list-group w-100 border border-primary" >
                        <ListGroup.Item as="li" active style={{backgroundColor:"#2464ee"}}>
                            Horario de Atención
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="w-100 border border-primary">
                            Lunes a Viernes de 09:00AM - 09:00PM
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="w-100 border border-primary">
                            Sabado a Dcomingos de 09:00AM - 05:00PM
                        </ListGroup.Item>
                    </ListGroup>
                    <p className="text-center mt-2">Sujeto a disponibilidad de citas</p>
                </div>
            </div>
        </div>
    )
}
export default atencionMenu;