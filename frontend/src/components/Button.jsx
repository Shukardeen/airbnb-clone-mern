import React from "react";

function Button({
  type = "",
  value,
  handleClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`h-10 rounded-md px-2.5 cursor-pointer my-1 font-jakarta ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default Button;
