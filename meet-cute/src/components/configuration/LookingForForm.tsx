import React from "react";
import PageTitle from "../pageLayout/PageTitle";
import { MIN_AGE, MAX_AGE, MIN_HEIGHT, MAX_HEIGHT, genderOptions } from "./FormUtils";
import { SelectField } from "./SelectField";
import { SliderField } from "./SliderField";
import "./form.css"

const LookingForForm: React.FC = () => {
  return (

    <div >

      <PageTitle title="Looking for" />
      <div className="form_wrapper">
        <form>

          <SelectField required={true} title="Gender: *" options={genderOptions} />

          <SliderField title="Age: *" type="number" requiredFrom={true} minFrom={MIN_AGE} maxFrom={MAX_AGE}
            requiredTo={true} minTo={MIN_AGE} maxTo={MAX_AGE} placeHolderFrom="18" placeHolderTo="120"/>;

          <SliderField title="Height (cm): *" type="number" requiredFrom={true} minFrom={MIN_HEIGHT} 
            maxFrom={MAX_HEIGHT} requiredTo={true} minTo={MIN_HEIGHT} maxTo={MAX_HEIGHT} 
            placeHolderFrom="1" placeHolderTo="1000"/>;

          <div>
            <button type="submit">Submit</button>
          </div>

        </form>
        </div>

      </div>
  );
};

export default LookingForForm;
