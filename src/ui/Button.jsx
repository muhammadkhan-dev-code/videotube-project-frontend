import React from "react";

const Button = ({ name, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" bg-purple-600 hover:bg-purple-700 text-white px-5 rounded-md py-2 font-semibold text-md "
    >
      {name}
    </button>
  );
};

export default Button;
