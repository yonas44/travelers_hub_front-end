import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <div className="app-container">
      <main className="main-container">
        <Routes>
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
