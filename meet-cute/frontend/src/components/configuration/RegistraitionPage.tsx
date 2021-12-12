import React from 'react';
import PageTitle from '../pageLayout/PageTitle';
import { InputField } from './InputField';
import { FaEnvelope } from "react-icons/fa";
import { MIN_PASSWORD_LEN } from './FormUtils';


const RegistraitionPage: React.FC = () => {
  return(
    <><PageTitle title="Registraition"/>
    
    <form>

      <InputField required={true} title="Email: *" type="email" placeHolder="abc@gmail.com" icon={<FaEnvelope/>}/>

      <InputField required={true} title="Password (8 characters minimum): *" type="password" 
                  placeHolder="Password here" minLength={MIN_PASSWORD_LEN}/>

      <InputField required={true} title="First Name: *" type="text" placeHolder="Jonh"/>

      <InputField required={true} title="Last name: *" type="text" placeHolder="Doe"/>

      <div>
        <button type="submit">Submit</button>
      </div>

    </form></>
  )
};

export default RegistraitionPage;