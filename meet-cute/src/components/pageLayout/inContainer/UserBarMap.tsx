import IUserData from '../../../models/IUserData';
import UserBar from '../../smallComp/UserBar';

interface IProp {
  users: Array<IUserData>;
}

const UserBarMap: React.FC<IProp> = ({ users }) => {
  return (
    <div key='userMap'>
      {users.map((user) => (
        <UserBar data={user} />
      ))}
    </div>
  );
};

export default UserBarMap;