import React from "react";
import { FaEnvelope } from "react-icons/fa";


const INPUT_MAX_LEN = 1000;

interface IProp {
  title: string;
  required: boolean;
  type: string;
  min?: string;
  max?: string;
  placeHolder?: string;
  icon?: JSX.Element;
}

export const InputField: React.FC<IProp> = ({ title, required, type, min, max, placeHolder, icon}) => {
  return (
    <label>
        <p>{title}</p>
        {icon}
        <input required={required} type={type} maxLength={INPUT_MAX_LEN} min={min} max={max} 
               placeholder={placeHolder}/>
    </label>
  );
};
