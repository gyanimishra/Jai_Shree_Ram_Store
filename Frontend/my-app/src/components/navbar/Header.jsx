import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";



const options = {
    logo:"https://i.pinimg.com/750x/ef/81/f8/ef81f84ccbf1cf3145f6cb32f761ebde.jpg",
    logoAnimationTime:1,
    link1Transition	:0.5,
    searchIconTransition:	0.5,
    cartIconTransition:	0.5,
    burgerColor:"black",
    navColor1:"#ff6502",
    burgerColorHover:"black",
    logoWidth:"100%",
    logoHoverColor:"#ff6502",
    link1Size:"1.2rem",
    link1Color:"#121212",
    link1Padding:"1vmax",
    link1ColorHover:"white",
    nav2justifyContent:"flex-end",
    link1Margin:"1vmax",
    link2Margin:"0",
    link3Margin:"0",
    link4Margin:"1vmax",
    nav3justifyContent:"flex-start",
    link1Text:"Home",
    link1Family:"sans-serif",
    link2Text:"Products",
    link3Text:"About Us",
    link4Text:"Contact Us",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    nav4justifyContent:"flex-start",
    searchIconMargin:"0.5vmax",
    cartIconMargin:"1vmax",
    profileIconMargin:"0.5vmax",
    searchIconColor:"black",
    cartIconColor:"black",
    profileIconColor:"black",
    searchIconColorHover:"white",
    cartIconColorHover:"white",
    profileIconColorHover:"white",
    profileIcon:true,
  profileIconColor: "black",
    ProfileIconElement: MdAccountCircle, 
  searchIcon:true,
  searchIconColor: "black",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "black",
  CartIconElement:MdAddShoppingCart,
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;