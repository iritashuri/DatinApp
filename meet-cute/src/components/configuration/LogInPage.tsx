import React from 'react';
import PageTitle from '../pageLayout/PageTitle';

const LogInPage: React.FC = () => {
  return(
    <>
      <PageTitle title="Login"/>
      <form>
        <label>
          <p>Email:</p>
          <input type="email" />
        </label>
        <label>
          <p>Password:</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
};

export default LogInPage;