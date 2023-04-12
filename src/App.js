import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Register from './pages/register';
import Login from './pages/login';
import BookingPage from './pages/BookingPage';
import Package from './pages/Package';
import PackageDetails from './components/PackageDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Reservations from './components/reservations/reservations';
import { flash } from './redux/flash/flash';
import { cleanFlash } from './redux/auth/auth';

const App = () => {
  const style = {
    main: 'flex items-start h-100',
  };
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const { message, errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      errors.forEach((error) => {
        flash('error', error);
      });
    }

    if (message) {
      flash('success', message);
    }

    dispatch(cleanFlash());
  }, [errors, message, dispatch]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
        <main className={style.main}>
          <Sidebar sidebar={sidebar} />
          <div className="main-container col-12 h-100">
            <Routes>
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/" element={<Package />} />
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
