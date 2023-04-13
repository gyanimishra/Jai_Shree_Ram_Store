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

         
        </Routes>
        <Footer/>
     
      </Router>
     
    </>
  );
}

export default App;
