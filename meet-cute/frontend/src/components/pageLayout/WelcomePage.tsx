import React from 'react';
import AppDescription from '../assets/AppDescription';
import AppLogo from '../assets/AppLogo';
import AppMainImg from '../assets/AppMainImg';
import RedirectButton from '../smallComp/RedirectButton';

const WelcomePage: React.FC = () => {
  return (
    <div>
    <div>
      <AppLogo /> <RedirectButton  buttonText = "Register" navigationURL='/registration'/>
    </div>
    <div>
        <AppDescription/> <AppMainImg/>
    </div>
    <RedirectButton  buttonText = "Sign in" navigationURL='/login'/>
    </div>

  );
};

export default WelcomePage