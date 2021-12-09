import Cities from "../../models/Cities";
import Gender from "../../models/Gender";

export const MIN_AGE = "18";
export const MAX_AGE = "120";

export const MIN_HEIGHT = "1";
export const MAX_HEIGHT = "1000";

export const genderOptions = (
  <>
    <option value={Gender.Male}>Male</option>
    <option value={Gender.Female}>Female</option>
    <option value={Gender.Other}>Other</option>
  </>
);

export const cityOptions = (
  <>
    <option value={Cities.None}></option>
    <option value={Cities.Haifa}>Haifa</option>
    <option value={Cities.TelAviv}>Tel Aviv</option>
    <option value={Cities.Jerusalem}>Jerusalem</option>
    <option value={Cities.Herzliya}>Herzliya</option>
    <option value={Cities.BeerSheva}>Beer Sheva</option>
  </>
);