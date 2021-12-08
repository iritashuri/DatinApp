import React from "react";

const MIN_AGE = "18";
const MAX_AGE = "120";

const MIN_HEIGHT = "1";
const MAX_HEIGHT = "1000";

const genderOptions = (
  <>
    <option value="other">Other</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </>
);

// const ageOptions = (
//   <>
//     <option value="all">All</option>
//     <option value="18-25">18-25</option>
//     <option value="26-32">26-32</option>
//     <option value="33-40">33-40</option>
//     <option value="41-50">41-50</option>
//     <option value="51-60">51-60</option>
//     <option value="61-70">61-70</option>
//     <option value="71-80">71-80</option>
//     <option value="81-90">51-60</option>
//   </>
// );


const LookingForForm: React.FC = () => {
  return (
    <>
      <form>
        <label>
          <p>Gender: *</p>
          <select required>{genderOptions}</select>
        </label>
        <label>
          <p>Age: *</p>
          From
          <input
            required
            id="minAge"
            type="number"
            min={MIN_AGE}
            max={MAX_AGE}
          />
          To
          <input
            required
            id="maxAge"
            type="number"
            min={MIN_AGE}
            max={MAX_AGE}
          />
        </label>
        <label>
          <p>Height (cm): *</p>
          From
          <input required type="number" min={MIN_HEIGHT} max={MAX_HEIGHT} />
          To
          <input required type="number" min={MIN_HEIGHT} max={MAX_HEIGHT} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default LookingForForm;
