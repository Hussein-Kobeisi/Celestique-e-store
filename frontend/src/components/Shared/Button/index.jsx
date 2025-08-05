import React from "react";
import "./index.css";

const Button = ({ text, onClickListener, className }) => {
  return (
    <button className={className} onClick={onClickListener}>
      {text}
    </button>
  );
};

export default Button;
