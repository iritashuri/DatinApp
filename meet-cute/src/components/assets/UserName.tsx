import React from 'react';
import useUserData from '../../hooks/use';

const UserName: React.FC = () => {
  const { userName, userLastName } = useUserData();

  return (
    <div>
      {userName} {userLastName}
    </div>
  );
};

export default UserName;
