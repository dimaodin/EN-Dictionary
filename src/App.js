import logo from "./images/bibliophile.svg";
import Dictionary from "./components/Dictionary";
import Developer from "./components/Developer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <a href="/">
            <img src={logo} alt="dictioanary-logo" className="logo" />
            <h1>EN Dictionary 📖</h1>
          </a>
        </header>
        <main>
          <Dictionary keyword="Developer" />
        </main>
        <footer>
          <Developer />
        </footer>
      </div>
    </div>
  );
}

export default App;
