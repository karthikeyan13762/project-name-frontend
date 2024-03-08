import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currDate = new Date().getFullYear();
  return (
    <div className="footer text-light p-4">
      <p className="text-center">
        &copy;<span className="karthikeyan">Karthikeyan</span>{" "}
        <span>{currDate}</span>. All Rights Reserved.
      </p>

      <p className="text-center mt-3">
        <Link className="text-white" to={"/about"}>
          About
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link className="text-white" to={"/contact"}>
          Contact
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link to={"/policy"} className="text-white">
          policy
        </Link>
      </p>
    </div>
  );
}

export default Footer;
