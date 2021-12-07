import React from 'react';

const image =
  'https://syringe-test.s3.us-west-2.amazonaws.com/shir-project-meet-cute-description.png';

const AppMainImg: React.FC = () => {
  return <img src={image} alt='main image' />;
};

export default AppMainImg;
