import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Package from './pages/Package';
import PackageDetails from './components/PackageDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Reservations from './components/reservations/reservations';

const App = () => {
  const style = {
    main: 'flex items-start',
  };
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <main className={style.main}>
        <Sidebar sidebar={sidebar} />
        <div className="main-container col-12">
          <Routes>
            <Route path="/" element={<Package />} />
            <Route path="/sign_up" element={<Register />} />
            <Route path="/sign_in" element={<Login />} />
            <Route path="/details" element={<PackageDetails />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default App;
