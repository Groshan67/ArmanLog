import React from "react";
import "./style/style.css";
import { FaSpinner } from "react-icons/fa";

const customLoadingOverlay = (props) => {
  return (
    <div className="style">
      <FaSpinner icon="spinner" className="spinner">
        {props.loadingMessage}
      </FaSpinner>
    </div>
  );
};

export default customLoadingOverlay;
