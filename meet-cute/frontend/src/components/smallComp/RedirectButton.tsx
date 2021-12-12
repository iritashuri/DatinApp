import React from 'react';
import { NavLink } from 'react-router-dom';

interface IProp {
  buttonText: string;
  navigationURL: string;
}

const RedirectButton: React.FC<IProp> = ({ buttonText, navigationURL }) => {
  return (
    <NavLink to={navigationURL}>
      <button>{buttonText}</button>
    </NavLink>
  );
};

export default RedirectButton;
