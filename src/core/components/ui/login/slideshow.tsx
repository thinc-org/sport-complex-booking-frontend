import React from "react"
import { Carousel } from "react-bootstrap"
import carousel1 from "../../../assets/images/carousel/carousel1.png"
import carousel2 from "../../../assets/images/carousel/carousel2.jpg"
import carousel3 from "../../../assets/images/carousel/carousel3.png"
import carousel4 from "../../../assets/images/carousel/carousel4.png"
import carousel5 from "../../../assets/images/carousel/carousel5.png"

const Slide = () => {
  const carouselImages = [carousel1, carousel2, carousel3, carousel4, carousel5]

  return (
    <div className="default-wrapper w-100">
      <Carousel className="h-100 w-100">
        {carouselImages.map((image) => (
          <Carousel.Item>
            <div style={{ display: "flex", overflow: "hidden", height: "400px", borderRadius: "15px", margin: "0px 5px" }}>
              <img src={image} alt="First slide" style={{ objectFit: "cover", flexShrink: 0, height: "100%" }} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
export default Slide
