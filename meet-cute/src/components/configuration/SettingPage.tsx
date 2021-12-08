import React from "react";
import PageTitle from "../pageLayout/PageTitle";
import AboutForm from "./about";
import LookingForForm from "./lookingFor";

const SettingPage: React.FC = () => {
  return (
    <>
      <PageTitle title="Settings" />
      <PageTitle title="About me" />
      <AboutForm />
      <PageTitle title="Looking for" />
      <LookingForForm />
    </>
  );
};

export default SettingPage;
