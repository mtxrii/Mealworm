import LandingLogo from './components/landingLogo/LandingLogo';
import SearchEngineSwitch from './components/searchEngineSwitch/SearchEngineSwitch';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LandingLogo />
      </header>
      <SearchEngineSwitch />
    </div>
  );
}

export default App;
