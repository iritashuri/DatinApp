const MIN_HEIGHT = "1";
const MAX_HEIGHT = "1000";

const genderOptions = (
  <>
    <option value="other">Other</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </>
);

export const aboutForm = (
  <>
    <label>
      <p>Birth date: *</p>
      <input type="date" />
    </label>
    <label>
      <p>Gender: *</p>
      <select>
        {genderOptions}
      </select>
    </label>
    <label>
      <p>Height (cm): *</p>
      <input type="number" min={MIN_HEIGHT} max={MAX_HEIGHT}/>
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
