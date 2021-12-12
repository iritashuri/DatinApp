import React from 'react';
import PageTitle from '../pageLayout/PageTitle';
import RedirectButton from '../smallComp/RedirectButton';
import { InputField } from './InputField';


const LogInPage: React.FC = () => {

  const handelSubmit = () => {
  
  }

  return(
    <><PageTitle title="Login"/>
      
    <form onSubmit={handelSubmit}>

      <InputField required={true} title="Email:" type="email"/>

      <InputField required={true} title="Password:" type="password"/>

      <div>
        <button type="submit"><RedirectButton buttonText={"Submit"} navigationURL={"/home"} /></button>
      </div>

    </form></>
  );
};

export default LogInPage;