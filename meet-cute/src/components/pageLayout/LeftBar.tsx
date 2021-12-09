import React, { CSSProperties } from "react";
import useUserData from "../../hooks/use";
import ProfilePicture from "../assets/ProfilePicture";
import UserName from "../assets/UserName";

const LeftBar: React.FC = () => {
  // const {userName, userLastName, profilePicture} = useUserData();
  // const {profilePicture} = useUserData();
  const userName = "Noy"
  const userLastName = "Gini"

  return (
    <nav>
        {/* <a href="/Home"><ProfilePicture profilePicture={profilePicture}/></a> */}
        <a href="/Home"><UserName userName={userName} userLastName={userLastName}/></a>
    </nav>
  );
};

export default LeftBar;