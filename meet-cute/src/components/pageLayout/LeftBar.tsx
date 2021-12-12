import React from "react";
import ProfilePicture from "../assets/ProfilePicture";
// import useUserData from "../../hooks/use";
// import ProfilePicture from "../assets/ProfilePicture";
import UserName from "../assets/UserName";

const LeftBar: React.FC = () => {
  // const {userName, userLastName, profilePicture} = useUserData();
  // const {profilePicture} = useUserData();
  const userName = "Noy"
  const userLastName = "Gini"

  return (
    <nav>
        <a href="/home/profile/:userId"><ProfilePicture profilePicture={''}/></a>
        <a href="/home/profile/:userId"><UserName userName={userName} userLastName={userLastName}/></a>
    </nav>
  );
};

export default LeftBar;