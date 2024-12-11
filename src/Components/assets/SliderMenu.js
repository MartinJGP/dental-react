import {Carousel} from "react-bootstrap";
import image1 from "../assets/images/slider/dent1.jpg";
import image2 from "../assets/images/slider/dent2.jpg";
import image3 from "../assets/images/slider/dent3.jpg";
const SliderMenu = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="img-den"
                        src={image1}
                        alt="First slide"
                        style={{
                            height: "800px",
                            width: "100%"
                        }}
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="img-den"
                        src={image2}
                        alt="Second slide"
                        style={{
                            height: "800px",
                            width: "100%"
                        }}
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="img-den"
                        src={image3}
                        alt="Third slide"
                        style={{
                            height: "800px",
                            width: "100%"
                        }}
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}
export default SliderMenu;