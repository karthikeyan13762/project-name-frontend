import React, { useState } from "react";
// import { resetPassword } from "../../../project-name-backend/controller/userController";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        await resetPassword({ resetToken, password }).unwrap();
        toast.success("Password Reset Successfully");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">ResetPassword</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="Confirmpassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {isLoading && <Spinner />}
              <button
                type="submit"
                className="btn btn-primary mt-4 "
                onClick={handleResetPassword}
              >
                subject
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
