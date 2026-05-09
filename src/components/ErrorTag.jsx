import React from "react";

const ErrorTag = ({ error }) => {
  return error && <p className="text-red-400 text-sm mt-4">{error}</p>;
};

export default ErrorTag;
