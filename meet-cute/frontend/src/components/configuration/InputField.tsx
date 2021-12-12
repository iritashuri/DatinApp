import React from "react";
// import { FaEnvelope } from "react-icons/fa";
import { INPUT_MAX_LEN } from "./FormUtils";


interface IProp {
  title: string;
  required: boolean;
  type: string;
  min?: string;
  max?: string;
  placeHolder?: string;
  icon?: JSX.Element;
  minLength?: number;
}

export const InputField: React.FC<IProp> = ({ title, required, type, min, max, placeHolder, icon, 
  minLength}) => {
  return (
    <label>
        <p>{title}</p>
        {icon}
        <input required={required} type={type} minLength={minLength} maxLength={INPUT_MAX_LEN} min={min} 
               max={max} placeholder={placeHolder}/>
    </label>
  );
};
