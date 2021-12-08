import React, { CSSProperties } from "react";
import ProfilePicture from "../assets/ProfilePicture";
import UserName from "../assets/UserName";

const style: CSSProperties = {
  position: "sticky",
  top: 0,
  left: 0,
}

const LeftBar: React.FC = () => {
  // const {name, lastName, profilePicture} = useUserData();
  return (
    <nav style={style}>
        {/* <a href="/Home"><ProfilePicture profilePicture={profilePicture}/></a> */}
        {/* <a href="/Home"><UserName name={name} lastName={lastName}/></a> */}
    </nav>
  );
};

export default LeftBar;