import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import WelcomePage from './components/pageLayout/WelcomePage';
import PageContainer from './components/pageLayout/PageContainer';
import RegistraitionPage from './components/configuration/RegistraitionPage';
import LogInPage from './components/configuration/LogInPage';
import AboutForm from './components/configuration/AboutForm';
import LookingForForm from './components/configuration/LookingForForm';
import PageTitle from './components/pageLayout/PageTitle';
import ProfilePicture from './components/assets/ProfilePicture';


const AppWithRouting: React.FC = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/registration' element={<RegistraitionPage />} />
          <Route path='/registration/about-me' element={<AboutForm />} />
          <Route path='/registration/looking-for' element={<LookingForForm />}/>
          <Route path='/login' element={<LogInPage />} />
          <Route path='/home' element={<PageContainer />}>
            {/* matching page */}
            <Route path='' element={<PageTitle title='matching page' />} />
            {/* search page */}
            <Route path='search' element={<PageTitle title='search page' />}/>
            {/* settings page */}
            <Route path='settings' element={<PageTitle title='settings page' />}/>
             {/* inbox page */}
             <Route path='inbox' element={<PageTitle title='inbox page' />}/>
            {/*profile page*/}
            <Route path='profile/:userId' element={<ProfilePicture profilePicture={''} />} />
          </Route>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <AppWithRouting />
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
