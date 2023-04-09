import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillHome,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { ImNotification } from 'react-icons/im';
import { BsFillBagDashFill } from 'react-icons/bs';
import { MdOutlineRoundaboutRight } from 'react-icons/md';
import airline from '../images/airline-gif.gif';
// eslint-disable-next-line
const Sidebar = ({ sidebar, handleSidebar }) => {
  const style = {
    link: 'no-underline',
    text: 'text-[37px] sidebar_title hidden md:block text-center text-[#1c1cc7] font-extrabold mt-[30%]',
    list: 'p-2 mt-[3px] flex items-center gap-2 font-extrabold text-[#103910] bg-[#fff] list',
  };
  return (
    <div className={`sidebar ${sidebar ? 'open' : ''}`}>
      <div>
        <h1 className={style.text}>Travellers Hub</h1>
        <ul className="mt-[40%] sidebar_list">
          <Link className={style.link} onClick={handleSidebar} to="/">
            <li className={style.list}>
              <AiFillHome />
              Home
            </li>
          </Link>
          <Link className={style.link} onClick={handleSidebar} to="/booking">
            <li className={style.list}>
              <AiOutlineShoppingCart />
              Booking
            </li>
          </Link>
          <Link className={style.link} onClick={handleSidebar} to="/promotions">
            <li className={style.list}>
              <ImNotification />
              Promotions
            </li>
          </Link>
          <Link
            className={style.link}
            onClick={handleSidebar}
            to="/reservations"
          >
            <li className={style.list}>
              <BsFillBagDashFill />
              Reservations
            </li>
          </Link>
          <Link className={style.link} onClick={handleSidebar} to="/about">
            <li className={style.list}>
              <MdOutlineRoundaboutRight />
              About
            </li>
          </Link>
          <Link className={style.link} onClick={handleSidebar} to="/new_package">
            <li className={style.list}>
              <MdOutlineRoundaboutRight /> 
              AddPackage
            </li>
          </Link>
          <Link className={style.link} onClick={handleSidebar} to="/sign_up">
            <li className={style.list}>
              <AiOutlineLogin />
              Register
            </li>
          </Link>
        </ul>
        <div className="mt-[40%]">
          <img className="airline_giphy" alt="airline_giphy" src={airline} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
