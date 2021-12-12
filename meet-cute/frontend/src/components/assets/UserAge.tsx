import React from 'react';

interface IProp{
  age: Number;
}

const UserAge: React.FC<IProp> = ( { age }) => {
  return (
    <div>
      {age}
    </div>
  );
};

export default UserAge;
