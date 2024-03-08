import React from "react";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayWithStripeMutation,
} from "../slices/orderApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function OrdersScreen() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payWithStripe, { isLoading: loadingStripe }] =
    usePayWithStripeMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  if (error) {
    return toast.error(error.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  const {
    shippingAddress,
    user,
    isDelivered,
    orderItems,
    shippingPrice,
    taxPrice,
  } = order;

  const calculateTotal = (orderItems) => {
    return orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  };
  // const handleStripePayment = async (orderItems)
  const handleStripePayment = () => {
    // try {
    //   const res = await payWithStripe(orderItems).unwrap();
    //   window.location.href = res.url;
    // } catch (error) {
    //   toast.error(error?.data?.message || error?.error);
    // }
    navigate("/sucess-screen");
  };

  const deliverOrderHandler = async (orderId) => {
    await deliverOrder(orderId);
    refetch();
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-4">Order Details</h2>
            <div className="mb-4">
              <h5 className="mb-2">Order Number:</h5>
              <p>{orderId}</p>
            </div>
            <div className="mb-4">
              <h5 className="mb-2">Shipping Details:</h5>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Address: {shippingAddress.address}</p>
            </div>
            <div className="mb-4">
              <h5 className="mb-2">Order Status:</h5>
              <p className={isDelivered ? "text-success" : "text-danger"}>
                {isDelivered ? "Delivered" : "Not Delivered"}
              </p>
            </div>
          </div>

          <div className="col-md-4 bg-light p-4">
            <h3 className="text-center mb-4">Order Summary</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="">
                    Product
                  </th>
                  <th scope="col" className="">
                    Quantity
                  </th>
                  <th scope="col" className="">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr key={item._id}>
                    <td className="">{item.name}</td>
                    <td className="">{item.qty}</td>
                    <td className="">${(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="">Shipping</td>
                  <td className=""></td>
                  <td className="">${shippingPrice}</td>
                </tr>
                <tr>
                  <td className="">Tax</td>
                  <td className=""></td>
                  <td className="">${taxPrice}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p className="">
                Total: $
                {+calculateTotal(orderItems).toFixed(0) +
                  +shippingPrice +
                  +taxPrice}
              </p>
            </div>
            <button
              className="btn btn-primary  mt-4"
              // () => handleStripePayment(orderItems)
              onClick={() => handleStripePayment()}
            >
              Pay with Stripe
            </button>
            {userInfo.isAdmin && !order.isDelivered && (
              <button
                className="btn btn-dark  mt-4 ms-2"
                onClick={() => deliverOrderHandler(orderId)}
              >
                Mark as Delivered
              </button>
            )}
            {loadingStripe && <Spinner />}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersScreen;
