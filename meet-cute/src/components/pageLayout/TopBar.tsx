import React from "react";
import AppLogo from "../assets/AppLogo";
import "./PageContainer.css";


const TopBar: React.FC = () => {
  return (
    <>
      <AppLogo />
      <a href="/home">Home</a>
      <a href="/home/inbox">Inbox</a>
      <a href="/home/settings">Settings</a>
      <a href="/">LogOut</a>
    </>
  );
};

export default TopBar;
