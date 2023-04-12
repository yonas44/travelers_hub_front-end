import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Register from './pages/register';
import Login from './pages/login';
import Promotions from './pages/Promotions';
import BookingPage from './pages/BookingPage';
import Package from './pages/Package';
import PackageDetails from './components/PackageDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Reservations from './components/reservations/reservations';

const App = () => {
  const style = {
    main: 'flex items-start h-100',
  };
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
        <main className={style.main}>
          <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} />
          <div className="main-container col-12 h-100">
            <Routes>
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/" element={<Package />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/sign_up" element={<Register />} />
              <Route path="/sign_in" element={<Login />} />
              <Route path="/details" element={<PackageDetails />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </div>
        </main>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
