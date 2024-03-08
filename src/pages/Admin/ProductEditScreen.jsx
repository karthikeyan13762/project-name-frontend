import React, { useState } from "react";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadFileHandlerMutation,
} from "../../slices/productsApiSlices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function ProductEditScreen() {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading: loadingProduct,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }, refetch] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadFileHandlerMutation();

  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: product?.name,
    price: product?.price,
    image: product?.image,
    brand: product?.brand,
    category: product?.category,
    countInStock: product?.countInStock,
    description: product?.description,
  });

  const { name, price, image, brand, category, countInStock, description } =
    productData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success("Product Updated");
      navigate("/admin/products");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setProductData({
        ...productData,
        image: res.image,
      });
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="form-label font-medium">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="form-label font-medium">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="form-label font-medium">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="form-label font-medium">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="countInStock" className="form-label font-medium">
            Count In Stock:
          </label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={countInStock}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="form-label font-medium">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Update Product
          </button>
          {uploadLoading && <Spinner />}
        </div>
      </form>
    </div>
  );
}
