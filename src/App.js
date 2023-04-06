import { Route, Routes } from 'react-router-dom';
import './App.css';
import Reservations from './components/reservations/reservations';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Reservations />} path="/reservations" />
      </Routes>
    </div>
  );
}

export default App;
