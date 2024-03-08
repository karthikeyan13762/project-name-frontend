import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/userSlice";
// ------------------------------------------

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword: urlKeyword } = useParams();
  const [logoutApi] = useLogoutMutation();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("logged Out Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  // -------------------------
  const renderAdminButton = () => {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-user-tie"></i>
          <span className=" ms-1">Admin</span>
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <Link
              className="dropdown-item"
              aria-current="page"
              to={"/admin/users"}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              aria-current="page"
              to={"/admin/products"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to={"/admin/orders"}>
              Orders
            </Link>
          </li>
        </ul>
      </>
    );
  };
  // ---------------------------
  // -------------------------
  const renderProfilebutton = () => {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-user me-1" />
          {userInfo?.name}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton"
        >
          <Link className="nav-link active" aria-current="page" to={"/profile"}>
            <i className="fa-solid fa-user me-1" />
            Profile
          </Link>
          <li>
            <Link
              className="dropdown-item"
              to={"/logout"}
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket me-1"></i>
              Logout
            </Link>
          </li>
        </ul>
      </>
    );
  };
  // ---------------------------

  const renderingSigninButton = () => {
    return (
      <Link className="nav-link active" aria-current="page" to={"/login"}>
        <i className="fa-solid fa-arrow-right-to-bracket"></i> Signin
      </Link>
    );
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid navbar-container mt-2">
          <Link className="navbar-brand" to={"/"}>
            <i className="fa-brands fa-kickstarter ">CART</i>
          </Link>

          <button
            className="navbar-toggler mb-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto  mt-3 ">
              <li className="nav-item ms-2">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  <b>HOME</b>
                </Link>
              </li>
              <li className="av-item ms-1">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    id="search-input"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success"
                    id="search-button"
                    type="submit"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </form>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/cart"}
                >
                  <i className="fa-solid fa-cart-shopping" />
                  Cart<span className="cartCount">{cartItems.length}</span>
                </Link>
              </li>
              <li className="nav-item ms-2">
                {userInfo && (
                  <div className="btn-group  ">{renderProfilebutton()}</div>
                )}
              </li>
              <li className="nav-item ms-2">
                {userInfo?.isAdmin && (
                  <div className="btn-group  ">{renderAdminButton()}</div>
                )}
              </li>

              <li className="nav-item ms-2">
                {!userInfo && renderingSigninButton()}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* ----------------------------------------------------------- */}
    </>
  );
}

export default Header;
