import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import './App.css';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div style={{ backgroundColor: "wheat", height: "100vh", padding: "30px" }}>
        <Routes location={location}>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
