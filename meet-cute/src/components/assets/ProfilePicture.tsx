import React from 'react';

interface IProp{
  profilePicture: string;
}

const ProfilePicture: React.FC<IProp> = ({profilePicture}) => {
  return (
    <img src={'https://drive.google.com/uc?export=download&id=1H4awjr9uCNp_56e2uX0PvBJiBVu_IroE'} alt='profile picture' />
  );
};

//todo set state of default picture init and change picture when aploaded.

export default ProfilePicture;