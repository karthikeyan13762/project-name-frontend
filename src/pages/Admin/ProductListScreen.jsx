import React from "react";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlices";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
// import Paginate from "../../components/Paginate";
// import { useSelector } from "react-redux";

export default function ProductListScreen() {
  // const { pageNumber } = useParams();
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    // pageNumber,
  });
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  // const { userInfo } = useSelector((state) => state.user);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error?.data?.message || error?.error);
  }

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        toast.success("Product Created");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  const editProductHandler = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(id);
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className=" mb-4 text-center">Products</h2>
      <div className="text-end mb-4">
        <button className="btn btn-primary" onClick={createProductHandler}>
          Create Product
        </button>
        {loadingCreate && <Spinner />}
      </div>
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => editProductHandler(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* {loadingDelete && <Spinner />} */}
        </table>
      </div>

      <div className="d-flex justify-content-center mt-4">
        {/* <Paginate
          pages={data.pages}
          page={data.pageNumber}
          isAdmin={userInfo.isAdmin}
        /> */}
      </div>
    </div>
  );
}
