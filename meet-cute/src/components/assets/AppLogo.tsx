import React from 'react';

const logo = 'https://syringe-test.s3.us-west-2.amazonaws.com/shir-project-logo-1.png'

const AppLogo: React.FC = () => {
  return (
    <img src={logo} alt="logo" width="100" height="70" />
  );
};

export default AppLogo;
