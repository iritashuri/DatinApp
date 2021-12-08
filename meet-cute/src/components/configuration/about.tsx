import React from "react";

const MIN_HEIGHT = "1";
const MAX_HEIGHT = "1000";

const genderOptions = (
  <>
    <option value="other">Other</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </>
);

const AboutForm: React.FC = () => {
  return (
    <>
      <label>
        <p>Birth date: *</p>
        <input type="date" required />
      </label>
      <label>
        <p>Gender: *</p>
        <select required>{genderOptions}</select>
      </label>
      <label>
        <p>Height (cm): *</p>
        <input type="number" min={MIN_HEIGHT} max={MAX_HEIGHT} required />
      </label>
      <label>
        <p>City:</p>
        <input type="text" />
      </label>
      <label>
        <p>Profession:</p>
        <input type="text" />
      </label>
      <label>
        <p>Hobbies:</p>
        <input type="text" />
      </label>
      <label>
        <p>About:</p>
        <input type="text" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </>
  );
};

export default AboutForm;
