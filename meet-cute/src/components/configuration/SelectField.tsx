import React from "react";

interface IProp {
  title: string;
  required: boolean;
  options: JSX.Element;
}

export const SelectField: React.FC<IProp> = ({ title, required, options }) => {
  return (
    <label>
      <p>{title}</p>
      <select required={required}>{options}</select>
    </label>
  );
};
