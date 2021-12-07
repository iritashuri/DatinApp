import React from 'react';

interface IProps {
  title: string;
}

const PageTitle: React.FC<IProps> = ({ title }) => {
  return <h2>{title}</h2>;
};

export default PageTitle