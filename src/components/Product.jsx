import React from "react";
import { Link } from "react-router-dom";

function Product({ products }) {
  return (
    <>
      <Link className="text-decoration-none" to={`/product/${products._id}`}>
        <div className="card ">
          <div className="card-header text-center">
            <h3>{products.name}</h3>
            <img
              className="card-image mt-3"
              src={products.image}
              alt={products.name}
            />
          </div>
          <div className="card-body">
            <div className="productPrice">
              <span className="text-danger ms-5">
                <b>${products.price.toFixed(2)}</b>
              </span>
              <span className="text-warning ms-5">
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <b>{products.rating}</b>
              </span>
              <span className="text-success">
                <b> ({products.numReviews} reviews)</b>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Product;
