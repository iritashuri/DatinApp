import React from 'react';

const gif = "https://c.tenor.com/PmdAE3m4CscAAAAi/lady-and-the-tramp-kiss.gif";

const image =
  'https://syringe-test.s3.us-west-2.amazonaws.com/shir-project-meet-cute-description.png';

const AppMainImg: React.FC = () => {
  return <img src={gif} alt='main image' />;
};

export default AppMainImg;
