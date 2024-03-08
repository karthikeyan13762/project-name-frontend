import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  //   ---------------------------------------------------------

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Register Successful");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };
  // _________________________________________________________________
  // const handleGoogleAuth = () => {
  //   try {
  //     window.location.href = `${BACKEND_URL}/auth/google/callback`;
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };
  // _________________________________________________________________

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
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
                className="btn btn-primary mt-4"
                disabled={isLoading}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-danger mt-4 ml-3 ms-2"
                // onClick={handleGoogleAuth}
                disabled
              >
                Sign up with Google
              </button>
              {isLoading && <Spinner />}
            </form>
            <p className="mt-4">
              Already have an account?
              <Link to="/login" className="text-primary">
                Sign In.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterScreen;
