import React from "react";
import PropTypes from "prop-types";

const Alert = ({ type, msg }) => {
  return (
    <div className={`alert alert-${type} mt-3`} role="alert">
      {msg}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.object.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Alert;
