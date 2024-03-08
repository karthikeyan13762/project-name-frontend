import React from "react";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) {
    <Spinner />;
  }

  if (error) {
    toast.error(error.message);
  }
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2 className=" mb-4 text-center">Orders List</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className="bg-gray">
                    <th className="text-center">ID</th>
                    <th className="text-center">User</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Delivered</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id} className="text-center">
                      <td className="border">{order._id}</td>
                      <td className="border">{order.user?.name}</td>
                      <td className="border">{order.createdAt.slice(0, 10)}</td>
                      <td className="border">${order.totalPrice}</td>
                      <td className="border">
                        {order.isDelivered ? "Yes" : "No"}
                      </td>
                      <td className="border">
                        <Link to={`/order/${order._id}`}>
                          <button className="btn btn-primary">
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderListScreen;
