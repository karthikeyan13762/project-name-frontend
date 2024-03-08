import React from "react";

function Spinner() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-90">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
