import React from "react";
import PageTitle from "../pageLayout/PageTitle";
import { aboutForm } from "./about";
import { lookingForForm } from "./lookingFor";


const SettingPage: React.FC = () => {
  return (
    <>
      <PageTitle title="Settings" />
      <PageTitle title="About me" />
      <form>{aboutForm}</form>
      <PageTitle title="Looking for" />
      <form>{lookingForForm}</form>
    </>
  );
};

export default SettingPage;
