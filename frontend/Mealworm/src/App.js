import * as React from 'react';
import LandingLogo from './components/landingLogo/LandingLogo';
import SearchEngineSwitch from './components/searchEngineSwitch/SearchEngineSwitch';
import SearchInputFields from './components/searchInputFields/SearchInputFields';
import './App.css';

const APP_CATCHPHRASES = [
  "Find somewhere new to eat",
  "Find random cool restaurants near you",
  "Get some new food suggestions"
]

function getRandomCatchphrase() {
  return APP_CATCHPHRASES[Math.floor((Math.random()*APP_CATCHPHRASES.length))];
}

function App() {
  const [isGoogle, setIsGoogle] = React.useState(false);
  const [catchphrase] = React.useState(getRandomCatchphrase());

  return (
    <div className="App">
      <header className="App-header">
        <LandingLogo catchphrase={catchphrase} />
      </header>
      <SearchEngineSwitch checked={isGoogle} setChecked={setIsGoogle} />
      <SearchInputFields isUsingGoogle={isGoogle} />
    </div>
  );
}

export default App;
