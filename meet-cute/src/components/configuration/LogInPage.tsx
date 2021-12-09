import React from 'react';
import PageTitle from '../pageLayout/PageTitle';
import { InputField } from './InputField';


const LogInPage: React.FC = () => {
  return(
    <><PageTitle title="Login"/>
      
    <form>

      <InputField required={true} title="Email:" type="email"/>

      <InputField required={true} title="Password:" type="password"/>

      <div>
        <button type="submit">Submit</button>
      </div>

    </form></>
  );
};

export default LogInPage;