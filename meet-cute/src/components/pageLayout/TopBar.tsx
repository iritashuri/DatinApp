import React from "react";
import AppLogo from "../assets/AppLogo";
import "./PageContainer.css";


const TopBar: React.FC = () => {
  return (
    <>
      <AppLogo />
      <a href="/Home">Home</a>
      <a href="/Inbox">Inbox</a>
      <a href="/Settings">Settings</a>
      <a href="/Welcome">LogOut</a>
    </>
  );
};

export default TopBar;
