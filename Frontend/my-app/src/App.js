import React, { useEffect, useRef, useState } from "react";
import WebFont from "webfontloader";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/navbar/Header";
import Home from "./components/Home/Home";
import audio from "./audio/audio.mp3";

import CaroselHeading from "./components/Carosel/CaroselHeading";
import Productdetails from "./components/Product/Productdetails";
import Products from "./components/Product/Products";
import SearchPage from "./components/Search/SearchPage";
import LoginSignup from "./components/Authentication/LoginSignup";
import User from "./components/Authentication/User";


function App() {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef(null);

  const handleButtonClick = () => {
    setHasUserInteracted(true);
    const audio = audioRef.current;
    audio.play();
  };

  return (
    <>
    
   
      <Router>
      <Header/>
        <Routes>
       
        <Route  path="/"   element={<Home/>}/>

        <Route  path="/product/:id"   element={<Productdetails/>}/>
        <Route  path="/products"   element={<Products/>}/>
        <Route  path="/products/:keyword"   element={<Products/>}/>
        <Route  path="/Search" element={<SearchPage/>} />

        <Route  path="/Account" element={<LoginSignup/>} />
        <Route  path="/user" element={<User/>} />
         
        </Routes>
        <Footer/>
     
      </Router>
     
    </>
  );
}

export default App;
