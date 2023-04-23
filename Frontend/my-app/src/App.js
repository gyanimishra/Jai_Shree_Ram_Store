import React, { useEffect, useRef, useState } from "react";
import WebFont from "webfontloader";
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/navbar/Header";
import Home from "./components/Home/Home";
import audio from "./audio/audio.mp3";
import {useDispatch, useSelector}  from "react-redux";
import store from "./Redux/Store";

import CaroselHeading from "./components/Carosel/CaroselHeading";
import Productdetails from "./components/Product/Productdetails";
import Products from "./components/Product/Products";
import SearchPage from "./components/Search/SearchPage";
import LoginSignup from "./components/Authentication/LoginSignup";
import Profile from "./components/Authentication/Profile";
import ProtectedRoute from "./Route/ProtectedRoute";
import { loadUser } from "./Redux/Actions/UserAction";
import UserOptions from "./components/navbar/UserOption";


function App() {
  const dispatch = useDispatch()
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user,"user")
  console.log(isAuthenticated,"authenticated")
  const audioRef = useRef(null);

  const handleButtonClick = () => {
    setHasUserInteracted(true);
    const audio = audioRef.current;
    audio.play();
  };
  useEffect(() => {
   

    dispatch(loadUser());

   
  }, []);

  return (
    <>
    
   
      <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}

        <Routes>
       
        <Route  path="/"   element={<Home/>}/>

        <Route  path="/product/:id"   element={<Productdetails/>}/>
        <Route  path="/products"   element={<Products/>}/>
        <Route  path="/products/:keyword"   element={<Products/>}/>
        <Route  path="/Search" element={<SearchPage/>} />

        <Route  path="/Account" element={<LoginSignup/>} />
        
        <Route
        path="/profile"
        element={
          isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
        }
      />
         
        </Routes>
        <Footer/>
     
      </Router>
     
    </>
  );
}

export default App;
