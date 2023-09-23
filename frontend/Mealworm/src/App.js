import LandingLogo from './components/landingLogo/LandingLogo';
import SearchEngineSwitch from './components/searchEngineSwitch/SearchEngineSwitch';
import SearchInputFields from './components/searchInputFields/SearchInputFields';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LandingLogo />
      </header>
      <SearchEngineSwitch />
      <SearchInputFields />
    </div>
  );
}

export default App;
