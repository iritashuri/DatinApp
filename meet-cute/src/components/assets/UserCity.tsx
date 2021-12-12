import React from 'react';

interface IProp{
  city: string;
}

const UserCity: React.FC<IProp> = ( { city }) => {
  return (
    <div>
      {city}
    </div>
  );
};

export default UserCity;
