import React, { useContext, useRef } from "react";
import { Context } from "../../Context";
import "./Speed.scss";

const Speed = () => {
  const context = useContext(Context);
  const sliderRef = useRef();
  const buttonRef = useRef();

  const handleMouseDown = (e) => {};

  return (
    <div id="sliderContainer" ref={sliderRef}>
      <div id="slideButton" ref={buttonRef} onMouseDown={handleMouseDown} />
    </div>
  );
};

export default Speed;
