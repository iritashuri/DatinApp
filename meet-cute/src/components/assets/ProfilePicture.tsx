import React from 'react';

interface IProp{
  profilePicture: string;
}

const ProfilePicture: React.FC<IProp> = ({profilePicture}) => {
  return (
    <img src={profilePicture} alt='profile picture' />
  );
};

export default ProfilePicture;