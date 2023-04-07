import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Package from './pages/Package';
import PackageDetails from './components/PackageDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

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
      <body>
        <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
        <main className={style.main}>
          <Sidebar sidebar={sidebar} />
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Package />} />
              <Route path="/details" element={<PackageDetails />} />
            </Routes>
          </div>
        </main>
      </body>
    </>
  );
};

export default App;
