// ---------------------------------------------
// static data from frontend
// import { products } from "../data/products";
// ---------------------------------------------
// ____________________OAutho_____________________________

// import axios from "axios"
// import { toast } from 'react-toastify'
// ____________________OAutho_____________________________

import Product from "../components/Product";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../slices/productsApiSlices";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";
export default function HomeScreen() {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery(keyword);

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    toast.error(error?.data?.message || error?.error);
  }
  // ------production
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error?.data?.message || error?.error);
  //   }
  // }, [error]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // ____________________OAutho_____________________________
  // const getUser = async () => {
  //   try {
  //     const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
  //       withCredentials: true,
  //     });
  //     dispatch(
  //       setCredentials({
  //         ...res.data.user._json,
  //         _id: res.data._id,
  //         isAdmin: res.data.user.isAdmin,
  //       })
  //     );
  //   } catch (error) {
  //     toast.error(error?.data?.message || error?.error);
  //   }
  // };

  //   useEffect(() => {
  //     getUser()
  // }, [])

  // _________________________________________________

  return (
    <>
      <div className="row">
        {products?.map((product, index) => (
          <div className="col-sm-12 col-md-4" key={index}>
            <Product products={product} />
          </div>
        ))}
      </div>
    </>
  );
}
