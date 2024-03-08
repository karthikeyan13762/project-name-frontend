import React from "react";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { clearCartItems } from "../slices/cartSlice";

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state?.cart);
  // console.log(cart);
  const {
    cartItems,
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      toast.success("Order Placed!");
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h4 className="text-2xl font-weight-bold mb-4">Place Order</h4>
          <div className="mb-4">
            <h4 className="text-lg font-weight-bold mb-2">Shipping Address:</h4>
            <p>
              {address}, {city}, {postalCode}, {country}
            </p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-weight-bold mb-2">Payment Method:</h4>
            <p>{paymentMethod}</p>
          </div>
        </div>
        <div className="col-md-4 bg-light p-4">
          <h3 className="text-xl font-weight-bold mb-4">Order Summary</h3>
          <table className="table">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-bottom border-gray-400">
                  <td className="text-left">{item.name}</td>
                  <td className="text-right">{item.qty}</td>
                  <td className="text-right">
                    ${(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="border-bottom border-gray-400">
                <td className="text-left font-weight-bold">Shipping</td>
                <td className="text-right"></td>
                <td className="text-right">${shippingPrice}</td>
              </tr>
              <tr className="border-bottom border-gray-400">
                <td className="text-left font-weight-bold">Tax</td>
                <td className="text-right"></td>
                <td className="text-right">${taxPrice}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-right font-weight-bold">Total: ${totalPrice}</p>
          </div>
          <button
            className="btn btn-warning text-white font-weight-bold py-2 px-4 rounded w-full mt-4"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
