import React from "react";

const Button = ({ name = "", onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 px-6 hover:cursor-pointer font-semibold text-sm font-serif ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
