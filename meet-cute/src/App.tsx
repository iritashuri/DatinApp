<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import Video from './components/Video';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <div key='branded video'>
          <Video />
        </div>
      </header>
    </div>
=======
import './App.css';
import LeftBar from './components/LeftBar';
import TopBar from './components/TopBar';

function App() {
  return (
      <>
        <TopBar />
        <LeftBar />
      </>
>>>>>>> f065ad8835f0c43c18e1c2211df57587910de073
  );
}

export default App;










// <div className="App">
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.tsx</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
// </div>