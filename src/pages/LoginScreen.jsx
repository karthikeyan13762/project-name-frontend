import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../slices/userApiSlice";
function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isLoadingPassword }] =
    useForgotPasswordMutation();

  // ----------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  // ----------------------------------------------------
  const handleForgotPassword = async () => {
    if (!email) alert("Please enter your email");
    else {
      try {
        const res = await forgotPassword({ email }).unwrap();
        toast.success(res.message);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  // ----------------------------------------------------
  // ___________________________________________________________
  // const handleGoogleAuth = () => {
  //   try {
  //     window.location.href = `${BACKEND_URL}/auth/google/callback`;
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };
  // __________________________________________________________

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
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
                  required
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
                  required
                />
              </div>
              <p className="mt-1">
                Forgot Password?
                <Link
                  className="text-primary cursor-pointer border-none"
                  // onClick={handleForgotPassword}
                >
                  Click here
                </Link>
              </p>
              {isLoadingPassword && <Spinner />}
              <button
                type="submit"
                className="btn btn-primary mt-4 "
                onClick={handleLogin}
                disabled={isLoading}
              >
                Login
              </button>
              <button
                type="submit"
                className="btn btn-danger mt-4 ml-3 ms-2"
                // onClick={handleGoogleAuth}
                disabled
              >
                Sign in with Google
              </button>
              {isLoading && <Spinner />}
            </form>
            <p className="mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
