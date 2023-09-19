import logo from '../assets/noun-worm-3088557.svg';
import './LandingLogo.css';

function App() {
  return (
    <div className="App-logo-container">
      <img src={logo} className="App-logo-img" alt="logo" />
      <div className="App-logo-text">
        <h1 className="App-logo-title">Mealworm</h1>
        <h3 className="App-logo-subtitle">Find somewhere new to eat</h3>
      </div>
    </div>
  );
}

export default App;
