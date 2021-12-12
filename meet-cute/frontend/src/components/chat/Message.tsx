import React from 'react';

interface IProp {
  text: string
  time: string
}

const Message: React.FC<IProp> = ({text, time}) => {
  return (
    <div >
        Message
        <span>text</span>
        <span>time</span>
    </div>
  );
};

export default Message;