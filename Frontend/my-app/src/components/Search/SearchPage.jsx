import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HelmetTitle from '../Helper/HelmetTitle'
import './Search.css'
const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
       const navigate= useNavigate()
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
       navigate(`/products/${keyword}`);
      } else {
       navigate("/products");
      }
    };
  return (
    <div >
    <HelmetTitle title="Search A Product -- ECOMMERCE" />
    <form className="searchBox"  onSubmit={searchSubmitHandler}  >
      <input
        type="text"
        placeholder="Search a Product ..."
       
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
 
  </div>
  )
}

export default SearchPage
