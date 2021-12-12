import React from 'react';
import useUserData from '../../hooks/use';

interface IProp{
  name: string;
  lastName: string;
}

const UserName: React.FC<IProp> = ( { name, lastName }) => {
  return (
    <div>
      {name} {lastName}
    </div>
  );
};

export default UserName;
