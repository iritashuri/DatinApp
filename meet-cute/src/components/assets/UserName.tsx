import React from 'react';
import useUserData from '../../hooks/use';

interface IProp{
  userName: string;
  userLastName: string;
}

const UserName: React.FC<IProp> = ( { userName, userLastName }) => {
  return (
    <div>
      {userName} {userLastName}
    </div>
  );
};

export default UserName;
