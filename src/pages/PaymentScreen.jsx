import React, { useState } from "react";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const handleContinue = () => {
    dispatch(savePaymentMethod(selectedPayment));
    navigate("/place-order");
  };
  return (
    <>
      <div className="mb-64">
        <h2 className="text-2xl font-weight-bold mb-4 mt-5">Payment Method</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Payment:</label>
          <div className="mb-2">
            <label className="inline-flex align-items-center">
              <input
                type="radio"
                value="Stripe or Credit card"
                className="form-check-input"
                onChange={(e) => setSelectedPayment(e.target.value)}
                checked={selectedPayment === "Stripe or Credit card"}
              />
              <span className="ml-2">Stripe or Credit Card</span>
            </label>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </>
  );
}

export default PaymentScreen;
