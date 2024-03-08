import React from "react";

function SucessScreen() {
  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-4 font-weight-bold mb-4">
            Payment Successful!
          </h1>
          <p className="lead text-muted">Thank you for your purchase.</p>
        </div>
      </div>
    </>
  );
}

export default SucessScreen;
