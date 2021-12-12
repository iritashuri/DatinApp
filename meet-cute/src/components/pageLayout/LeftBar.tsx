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
<<<<<<< HEAD
        {/* <a href="/Home"><ProfilePicture profilePicture={profilePicture}/></a> */}
        <a href="/Home"><UserName name={userName} lastName={userLastName}/></a>
=======
        <a href="/home/profile/:userId"><ProfilePicture profilePicture={''}/></a>
        <a href="/home/profile/:userId"><UserName userName={userName} userLastName={userLastName}/></a>
>>>>>>> f9e022c8ca6143c576c410c1a6197035c296ca41
    </nav>
  );
};

export default LeftBar;