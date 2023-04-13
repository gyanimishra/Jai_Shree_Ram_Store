import React, { Fragment, useEffect } from "react";
import {useDispatch, useSelector}  from "react-redux";
import { useAlert } from "react-alert";
import { FaHandPointDown } from "react-icons/fa";
import HelmetTitle from "../Helper/HelmetTitle";
import "./Home.css";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../Redux/Actions/productAction";
import Loader from "../Helper/Loader";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector((state) => state.products);
    console.log(error,"error hai")

    console.log(product,"products");
    
    useEffect( ()=>{
        if (error) {
            alert.error(error);
           
          }
          dispatch(getAllProducts());
        }, []);
  return (
    <Fragment>
    <HelmetTitle  title="Jai Shree Ram - HomePage"/>
 {loading ? <Loader/>:
<Fragment>
 
        

 <div className="banner">
   <p>Welcome to JAI SHREE RAM PRODUCTS</p>
   <h1>FIND AMAZING PRODUCTS BELOW</h1>

   <a href="#container">
     <button>
       Scroll <FaHandPointDown />  
     </button>
   </a>
 </div>

 <h2 className="homeHeading">Featured Products</h2>

 <div className="container" id="container">
   {product &&
     product.map((product) => (
       <ProductCard key={product._id} product={product} />
     ))}
 </div>
 </Fragment>

}
    </Fragment>
  );
};

export default Home;