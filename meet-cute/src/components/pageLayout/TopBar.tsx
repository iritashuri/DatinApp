import React from "react";
import AppLogo from "../assets/AppLogo";
import SearchBar from "../smallComp/SearchBar";
import "./PageContainer.css";
import { FaBars } from "react-icons/fa";


function responsiveTopBar() {
  var x = document.getElementById("topBar");
  if (x.className === "topBar") {
    x.className += " responsive";
  } else {
    x.className = "topBar";
  }
}

const TopBar: React.FC = () => {
  return (
    <>
      <AppLogo />
      <SearchBar />
      <a href="/home">Home </a>
      <a href="/home/inbox">Inbox </a>
      <a href="/home/settings">Settings </a>
      <a href="/">LogOut </a>
      <a href="javascript:void(0);" className="icon" onClick={responsiveTopBar}>
        <FaBars />
      </a>
    </>
  );
};

export default TopBar;
