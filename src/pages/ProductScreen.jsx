import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
// --------------------------------------StaticData from frontend

// import products from "../data/products";

// --------------------------------------StaticData from frontend
import { addToCart } from "../slices/cartSlice";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlices";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function ProductScreen() {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: LoadingCreateReview }] =
    useCreateReviewMutation();
  const addtoCartHandker = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({
        productId,
        rating: userRating,
        comment: userComment,
      }).unwrap();
      refetch();
      toast.success(res.message);
      setUserComment("");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <div className="container mx-auto mt-8 p-4">
      <Link to="/" className="btn btn-primary mb-4">
        Go Back
      </Link>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        toast.error(error?.data?.message || error?.error)
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p>{product.description}</p>

            <div className="row">
              <div className="col-6">
                <div className="d-flex align-items-center mt-2">
                  <span>{product.rating}</span>
                  <span className="text-gray">
                    ({product.numReviews} reviews)
                  </span>
                </div>
                <p className="mt-2">${product?.price?.toFixed(2)}</p>
                <p>In Stock: {product.countInStock}</p>
              </div>
              <div className="col-6">
                <div className="mt-4">
                  <label htmlFor="quantity" className="text-gray ms-2 mb-2">
                    <b> Quantity:</b>
                  </label>
                  <select
                    id="quantity"
                    className="form-select "
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button className="btn btn-warning mt-3" onClick={addtoCartHandker}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <div>
        <div className="mt-5">
          <h2 className="text-center">Customer Reviews</h2>
          <div className="mt-4">
            <ul>
              {product?.reviews?.map((review, i) => (
                <div
                  key={i}
                  className="border rounded-md py-3 px-4 mb-4 shadow-sm"
                >
                  <div className="flex items-center">
                    {[...Array(review.rating).keys()].map((num) => (
                      <span key={num} className="text review-text mr-1">
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <p className="text">{review.comment}</p>
                  <p className="text">{review.name}</p>
                </div>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-center ">Write a Review</h3>
            <div className="mt-2">
              <label htmlFor="userReview" className="form-label">
                Your Review:
              </label>
              <textarea
                id="userReview"
                className="form-control mt-2"
                rows="4"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Write your review here..."
              ></textarea>
            </div>
            <div className="mt-2">
              <label htmlFor="rating" className="form-label">
                Rating:
              </label>
              <select
                id="rating"
                className="form-select mt-2"
                value={userRating}
                onChange={(e) => setUserRating(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} stars
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary px-4 py-2 rounded-md mt-4"
              onClick={handleCreateReview}
            >
              Submit Review
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Write a Review</h3>
            <p className="text-gray-700">
              Please
              <Link to="/login" className="text-blue-500">
                log in
              </Link>
              to write a review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
