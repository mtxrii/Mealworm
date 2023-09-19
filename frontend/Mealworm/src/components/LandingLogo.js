import logo from '../assets/noun-worm-3088557.svg';
import './LandingLogo.css';

const APP_CATCHPHRASES = [
  "Find somewhere new to eat",
  "Find random cool restaurants near you",
  "Get some new food suggestions"
]

function getRandomCatchphrase() {
  return APP_CATCHPHRASES[Math.floor((Math.random()*APP_CATCHPHRASES.length))];
}

function App() {
  return (
    <div className="App-logo-container">
      <img src={logo} className="App-logo-img" alt="logo" />
      <div className="App-logo-text">
        <h1 className="App-logo-title">Mealworm</h1>
        <h3 className="App-logo-subtitle">{getRandomCatchphrase()}</h3>
      </div>
    </div>
  );
}

export default App;
