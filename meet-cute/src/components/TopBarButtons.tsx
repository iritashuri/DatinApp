import React from 'react';

interface ITopButton {
  text: string;
}

const TopBarButtons: React.FC<ITopButton> = ({text}) => {
  return <button>{text}</button>;
};

export default TopBarButtons;