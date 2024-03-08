import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../slices/cartSlice";

export default function CartScreen() {
  const { cartItems, taxPrice, shippingPrice, totalPrice, itemsPrice } =
    useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((acc, item) => acc + +item.qty, 0);

  const handleDeleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-start">
        <div className="col-md-8 p-4">
          <h2 className="text-center mb-4">Shopping Cart</h2>
          {cartItems.length !== 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {cartItems.map((item) => (
                <div className="col border" key={item._id}>
                  <div className="">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="">${item.price.toFixed(2)}</p>
                      <p className="">Quantity: {item.qty}</p>
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className=" text-center">Your Cart is empty.</p>
          )}
        </div>

        {cartItems.length !== 0 && (
          <div className="col-md-4  p-4">
            <h2 className="">Subtotal</h2>
            <p className="">Total Items: {totalItems} </p>
            <p className="">Items Price: {itemsPrice} </p>
            <p className="">Tax: ${taxPrice} </p>
            <p className="">Shipping Price: ${shippingPrice} </p>
            <p className="">Total Price: ${totalPrice} </p>
            <button
              className="btn btn-primary  mt-4"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
