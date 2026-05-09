// src/components/Input.jsx
import React, { useRef, useState } from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  label = "",
  placeholder = "",
  rows = 5,
  options = [], // for select: [{ value, label }]
  accept = "image/*", // for file input
  className = "",
  disabled = false,
  required = false,
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(file); // pass the File object to parent
    } else {
      setFileName("");
      onChange(null);
    }
  };

  // Common styling classes
  const baseClasses = ` 
    w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 
    text-white text-sm tracking-[0.05rem] 
    outline-none focus:border-[#0070FF]/50 transition-all
    placeholder:text-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  // Wrapper with optional label
  const wrapWithLabel = (inputElement) => (
    <div className="w-full">
      {label && (
        <label className="block  tracking-[0.05rem] font-medium text-zinc-400 mb-2">
          {label}
        </label>
      )}
      {inputElement}
    </div>
  );

  // Textarea
  if (type === "textarea") {
    return wrapWithLabel(
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`${baseClasses} resize-none`}
      />,
    );
  }

  // Select dropdown
  if (type === "select") {
    return wrapWithLabel(
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
        ${baseClasses}
        appearance-none cursor-pointer
        bg-[#131313] text-white
        [&_option]:bg-[#131313] [&_option]:text-zinc-500
        [&_option]:hover:bg-[#0070FF] [&_option]:hover:text-white
        [&_option]:transition-all
      `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "16px",
        }}
      >
        <option value="" disabled hidden>
          {placeholder || "SELECT"}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>,
    );
  }

  // Custom file input
  if (type === "file") {
    return wrapWithLabel(
      <div>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`
            cursor-pointer w-full bg-white/5  rounded-sm px-6 py-4
            transition-all duration-200 hover:bg-white/10
            flex items-center justify-between
            ${fileName ? " border border-[#0070FF]/50 bg-white/10  text-[#0070FF] white " : "border border-white/10   text-zinc-500"}
          `}
        >
          <span className=" font-sm tracking-[0.05rem] ">
            {fileName || placeholder || "CHOOSE FILE"}
          </span>
          <span
            className={`material-symbols-outlined  text-sm  ${fileName ? "text-[#0070FF]" : "text-zinc-500"}`}
          >
            upload_file
          </span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
          required={required}
        />
      </div>,
    );
  }
  // Password input with show/hide toggle
  if (type === "password") {
    const inputType = showPassword ? "text" : "password";
    return wrapWithLabel(
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${baseClasses} pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
          tabIndex={-1}
        >
          <span className="material-symbols-outlined text-base">
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>,
    );
  }

  // Default: text input (and other types like email, url, etc.)
  return wrapWithLabel(
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={baseClasses}
    />,
  );
};

export default Input;
