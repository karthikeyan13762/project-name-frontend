import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="text-3xl font-weight-bold mb-4 text-center">
              Shipping
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="address" className="text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="text-gray-700">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode" className="text-gray-700">
                  Postal Code:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  className="form-control"
                  placeholder="Enter your postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country" className="text-gray-700">
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  className="form-control"
                  placeholder="Enter your country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingScreen;
