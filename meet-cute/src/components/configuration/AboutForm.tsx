import React from "react";
import PageTitle from "../pageLayout/PageTitle";
import { MIN_HEIGHT, MAX_HEIGHT, genderOptions, cityOptions } from "./FormUtils";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";


const AboutForm: React.FC = () => {
  return (
    
    <><PageTitle title="About me" />
    
    <form>

      <InputField required={true} title="Birth date: *" type="date" />

      <SelectField required={true} title="Gender: *" options={genderOptions} />

      <InputField required={true} title="Height: (cm) *" type="number" min={MIN_HEIGHT} max={MAX_HEIGHT} />

      <SelectField required={false} title="City:" options={cityOptions} />

      <InputField required={false} title="Profession:" type="text" />

      <InputField required={false} title="Hobbies:" type="text" />

      <InputField required={false} title="About:" type="text" />

      <div>
        <button type="submit">Submit</button>
      </div>

    </form></>
  );
};

export default AboutForm;
