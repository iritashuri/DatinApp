import React from "react";
import ContentPage from "./ContentPage";
import LeftBar from "./LeftBar";
import TopBar from "./TopBar";
import "./PageContainer.css";

const PageContainer: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="topBar">
        <TopBar />
      </div>

      <div className="leftBar">
        <LeftBar />
      </div>

      <div className="main_content">
        <ContentPage />
      </div>
    </div>
  );
};

export default PageContainer;
