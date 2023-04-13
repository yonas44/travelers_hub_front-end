import { useState } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import store from './redux/configureStore';
import Register from './pages/register';
import Login from './pages/login';
import Package from './pages/Package';
import PackageDetails from './components/PackageDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Reservations from './components/reservations/reservations';
import BookingPage from './pages/BookingPage';
import AddPackage from './components/packages/AddPackage';

const App = () => {
  const style = {
    main: 'flex items-start',
  };
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [show, setShow] = useState(false);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
        <main className={style.main}>
          <Sidebar sidebar={sidebar} />
          <div className="main-container col-12 h-100">
            <Routes>
              <Route path="/booking" element={<BookingPage />} />
              <Route
                path="/"
                element={<Package show={show} setShow={setShow} />}
              />
              <Route path="/sign_up" element={<Register />} />
              <Route path="/sign_in" element={<Login />} />
              <Route path="/details" element={<PackageDetails />} />
              <Route path="/addPackage" element={<AddPackage />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </div>
        </main>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
