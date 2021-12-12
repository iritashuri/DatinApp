import React from 'react';

interface IProp {
  message: string;
}

const ErrorMessage: React.FC<IProp> = ({ message }) => {
  return <div>{message}</div>;
};

export default ErrorMessage;
