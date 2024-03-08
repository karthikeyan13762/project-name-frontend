import React from "react";

function Contcat() {
  return (
    <div className="container about_contact_policy">
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src="contact.jpg" alt="contactus" />
        </div>
        <div className="col-md-4 contactus-content">
          <h4 className=" p-2 text-white text-center">CONTACT US</h4>
          <p className="text-justify mt-2">
            Need assistance or have questions about our products? Reach out to
            us anytime - we're at your service 24/7.
          </p>
          <p className="mt-3 text-justify">
            <i className="fa-solid fa-globe"></i>: www.help@kcart.com
          </p>
          <p className="mt-3 text-justify">
            <i className="fa-solid fa-phone"></i>: 0123456789
          </p>
          <p className="mt-3 text-justify">
            <i className="fa-solid fa-headset"></i>: 1800-1800-1800 (toll free)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contcat;
