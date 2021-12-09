import React from 'react';
import PageTitle from '../pageLayout/PageTitle';
import { InputField } from './InputField';
import { FaEnvelope } from "react-icons/fa";



const RegistraitionPage: React.FC = () => {
  return(
    <><PageTitle title="Registraition"/>
    
    <form>

      <InputField required={true} title="Email: *" type="email" placeHolder="abc@gmail.com" icon={<FaEnvelope/>}/>

      <InputField required={true} title="Password: *" type="password" placeHolder="Password here"/>

      <InputField required={true} title="First Name: *" type="text" placeHolder="Jonh"/>

      <InputField required={true} title="Last name: *" type="text" placeHolder="Doe"/>

      <div>
        <button type="submit">Submit</button>
      </div>

    </form></>
  )
};

export default RegistraitionPage;