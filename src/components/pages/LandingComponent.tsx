import React from "react";
import image1 from "../../assets/images/image 1.png";
import image2 from "../../assets/images/image 2.png";
import ellipse1 from "../../assets/images/Ellipse 1.png";
import ellipse2 from "../../assets/images/Ellipse 2.png";

function Landing() {
  return (
    <div className="container p-0">
      <div className="col p-4 m-0 mt-4">
        <h4> Chulalongkorn University </h4>
        <h4> Sports Complex </h4>
      </div>
      <div>
        <img className="landing image ellipse1" src={ellipse1} />
        <img className="landing image image1" src={image1} />
        <img className="landing image ellipse2" src={ellipse2} />
        <img className="landing image image2" src={image2} />
      </div>
      <div className="col mb-4 fixed-bottom">
        <a className="landing btn btn-lg col" role="button">
          {" "}
          Enter Sports Complex{" "}
        </a>
      </div>
    </div>
  );
}

export default Landing;
