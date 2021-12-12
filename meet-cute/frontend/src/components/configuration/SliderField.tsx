import React from "react";

interface IProp {
  title: string;
  type: string
  requiredFrom: boolean;
  minFrom: string;
  maxFrom: string;
  requiredTo: boolean;
  minTo: string;
  maxTo: string;
  placeHolderFrom: string
  placeHolderTo: string
}

export const SliderField: React.FC<IProp> = 
    ({ title, type, requiredFrom, minFrom, maxFrom, requiredTo, minTo, maxTo, placeHolderFrom, placeHolderTo }) => {
    return (
        <>
         
    <label>
        <p>{title}</p>
            From <input required={requiredFrom} id="minAge" type={type} min={minFrom} max={maxFrom} 
                  placeholder={placeHolderFrom}/>
            To <input required={requiredTo} id="maxAge" type={type} min={minTo} max={maxTo} 
                  placeholder={placeHolderTo}/>
    </label>
    </>
  );
};
