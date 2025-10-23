import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className="",  ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 pl-1 text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        id={id}
        className={`px-4 py-3 rounded-full bg-white text-black outline-none border border-gray-300 
        focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 
        w-full ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
