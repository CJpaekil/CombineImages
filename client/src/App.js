import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import './App.css';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div className="Main">
        <Routes location={location}>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
