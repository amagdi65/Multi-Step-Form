import React from "react";

const Button = ({ type, name, classNames, onClick }) => {
  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
