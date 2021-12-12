import Gender from "./Gender";

interface IUserData {
  userName: string;
  userLastName: string;
  profilePicture: File;
  birthDate: Date;
  age: number;
  gender: Gender,
  city: string,
  profession: string,
  hobbies: string,
  about: string,
}

export default IUserData