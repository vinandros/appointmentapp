import React from "react";
const Alert = ({ type, msg }) => {
  return (
    <div className={`alert alert-${type} mt-3`} role="alert">
      {msg}
    </div>
  );
};

export default Alert;
