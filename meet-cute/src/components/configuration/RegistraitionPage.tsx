import React from 'react';
import PageTitle from '../pageLayout/PageTitle';

const RegistraitionPage: React.FC = () => {
  return(
    <>
      <PageTitle title="Registraition"/>
      <form>
        <label>
          <p>Email:</p>
          <input type="email" />
        </label>
        <label>
          <p>Password:</p>
          <input type="password" />
        </label>
        <label>
          <p>First Name:</p>
          <input type="text" />
        </label>
        <label>
          <p>Last name:</p>
          <input type="text" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
};

export default RegistraitionPage;