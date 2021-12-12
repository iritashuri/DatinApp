import React from 'react';
import IUserData from '../../models/IUserData';
import ProfilePicture from '../assets/ProfilePicture';
import UserName from '../assets/UserName';
import UserCity from '../assets/UserCity';
import UserAge from '../assets/UserAge';

interface IProp {
  data: IUserData;
}

const UserBar: React.FC<IProp> = ({ data }) => {
  return (
    <div>
      <ProfilePicture profilePicture={data.profilePicture} />
      <UserName name={data.userName} lastName={data.userLastName} />
      <UserAge age={data.age} />
      <UserCity city={data.city} />
    </div>
  );
};

export default UserBar;
