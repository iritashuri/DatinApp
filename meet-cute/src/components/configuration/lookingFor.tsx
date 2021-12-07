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


export const lookingForForm = (
    <>
      <label>
        <p>Gender: *</p>
        <select>
            {genderOptions}
        </select>
      </label>
      <label>
        <p>Age: *</p>
        from 
        <input id="minAgeValue" type="number" min={MIN_AGE} max={MAX_AGE}/>
        to
        <input type="number" min={MIN_AGE} max={MAX_AGE}/>
      </label>
      <label>
        <p>Height (cm): *</p>
        from 
        <input type="number" min={MIN_HEIGHT} max={MAX_HEIGHT}/>
        to
        <input type="number" min={MIN_HEIGHT} max={MAX_HEIGHT}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </>
  );