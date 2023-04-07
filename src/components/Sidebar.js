import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
const Sidebar = ({ sidebar }) => {
  const style = {
    text: 'text-[27px] sidebar_title hidden md:block text-center text-[#1c1cc7] font-extrabold py-[25px]',
    list: 'p-4 mt-[3px] bg-[#fff] rounded-md',
  };
  return (
    <div className={`sidebar ${sidebar ? 'open' : ''} p-[15px]`}>
      <div>
        <h1 className={style.text}>Travellers Hub</h1>
        <ul className="mt-[20px]">
          <Link to="/"><li className={style.list}><a href="https://broken.com">Home</a></li></Link>
          <li className={style.list}><a href="https://broken.com">Booking</a></li>
          <li className={style.list}><a href="https://broken.com">Promotions</a></li>
          <li className={style.list}><a href="https://broken.com">Reservations</a></li>
          <li className={style.list}><a href="https://broken.com">About</a></li>
          <li className={style.list}><a href="https://broken.com">Register</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
