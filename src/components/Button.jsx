import React from "react";

const Button = ({
  text,
  icon,
  onClick,
  type = "filled",
  submit,
  rounded,
  fullWidth,
  className,
  disabled,
}) => {
  if (type === "outlined" || type === "filled") {
    return (
      <button
        disabled={disabled || false}
        type={submit ? "submit" : "button"}
        onClick={onClick}
        className={` px-4 py-2 text-sm font-semibold transition-all duration-300 
        ${type === "filled" && "bg-[#0070FF] hover:bg-[#0050CC] text-white"}
        ${type === "outlined" && "border border-[#0070FF]  text-[#0070FF] hover:text-[#131313] hover:bg-[#0070FF]"}
        ${rounded || "rounded-lg"}  
        ${fullWidth ? "w-full" : ""}   
        ${text && icon && "flex items-center gap-2"}
        ${className || ""}
      `}
      >
        {icon && (
          <span className="material-symbols-outlined text-base"> {icon} </span>
        )}
        {text && text}
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled || false}
        type={submit ? "submit" : "button"}
        onClick={onClick}
        className={` px-4 py-2 text-sm font-semibold transition-all duration-300 
        ${rounded || "rounded-lg"}  
        ${fullWidth ? "w-full" : ""}
        ${text && icon && "flex items-center gap-2"}
        ${className || ""}
      `}
      >
        {icon && (
          <span className="material-symbols-outlined text-base"> {icon} </span>
        )}
        {text && text}
      </button>
    );
  }
};

export default Button;
