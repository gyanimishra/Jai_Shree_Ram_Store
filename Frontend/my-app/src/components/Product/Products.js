import React, { useEffect, useState } from 'react'
import './Products.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Loader from '../Helper/Loader';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Fragment } from 'react';
import HelmetTitle from '../Helper/HelmetTitle';
import { useAlert } from "react-alert";
import ProductCard from '../Home/ProductCard';
import { clearErrors, getAllProducts } from '../../Redux/Actions/productAction';


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "cloths",
    "Camera",
    "SmartPhones",
  ];
  
  
  

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {
        product,
        loading,
        error,
        productsCount,
        resultPerPage,
       
        } = useSelector((state) => state.products);

        console.log(product,"products")
        const [currentPage, setCurrentPage] = useState(1);
        const [price, setPrice] = useState([0, 25000]);
    
        const [category, setCategory] = useState("");
    
      const [ratings, setRatings] = useState(0);

      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
      const {keyword} =useParams()
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(getAllProducts(keyword,currentPage,price,category,ratings));
      }, [dispatch,keyword, alert, error,currentPage,price,category,ratings]);
    
  return (
    <Fragment>
    {
        loading ? <Loader/>: <Fragment>
            <HelmetTitle title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {product &&
              product.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
   <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
   <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
              </div>
       
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount||8}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
        
        </Fragment>
    }
   </Fragment>
  )
}

export default Products
