import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/userSlice";
import Spinner from "../components/Spinner";
// import { addOrderItems } from "../../../server/controllers/orderController";

function ProfileScreen() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: userOrders, isLoading, error } = useGetUserOrdersQuery();
  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await updateUser({
      _id: userInfo._id,
      name,
      email,
      password,
    }).unwrap();
    dispatch(setCredentials({ ...res }));
    toast.success("Updated Profile");
  };

  if (error) {
    return toast.error(error.message);
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3 p-4">
            <h1 className="mb-4">Profile</h1>

            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary "
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
              {isUpdating && <Spinner />}
            </form>
          </div>
          <div className="col-md-9 p-4 ">
            <h2 className=" mb-4">Your Orders</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="table ">
                <thead className="border">
                  <tr>
                    <th scope="border ">Order ID</th>
                    <th scope=" border">Date</th>
                    <th scope=" border">Total</th>
                    <th scope=" border">Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders?.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.slice(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isDelivered ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userOrders.length === 0 && (
              <p className="text-muted text-xl text-center mt-5">No Orders</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
