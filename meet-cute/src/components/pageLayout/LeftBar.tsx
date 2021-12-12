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

  const file = new File(["foo"], "foo.txt");
  return (
    <nav>
        <a href="/home/profile/:userId"><ProfilePicture profilePicture={file}/></a>
        <a href="/home/profile/:userId"><UserName name={userName} lastName={userLastName}/></a>
    </nav>
  );
};

export default LeftBar;