import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillHome,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BsFillBagDashFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { TbJetpack } from 'react-icons/tb';
import airline from '../images/airline-gif.gif';
import { cleanFlash, signout } from '../redux/auth/auth';
// eslint-disable-next-line
const Sidebar = ({ sidebar, handleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [current, setCurrent] = useState('');

  const style = {
    link: 'no-underline',
    text: 'text-[37px] sidebar_title hidden md:block text-center text-[#1c1cc7] font-extrabold mt-[15%]',
    list: 'p-2 mt-[3px] flex items-center gap-2 font-extrabold text-[#103910] bg-[#fff] list',
  };

  useEffect(() => {
    setCurrent(JSON.parse(sessionStorage.getItem('current'))?.username);
  }, [user]);

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
          <Link className={style.link} onClick={handleSidebar} to="/promotions">
            <li className={style.list}>
              <TbJetpack />
              Promotions
            </li>
          </Link>
          <Link className={style.link} onClick={handleSidebar} to="/addPackage">
            <li className={style.list}>
              <IoMdAdd />
              Add package
            </li>
          </Link>
          {current ? (
            <button
              type="button"
              className={style.list}
              onClick={() => {
                dispatch(signout());
                dispatch(cleanFlash());
              }}
              style={{
                width: '100%',
                background: 'red',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              <AiOutlineLogout />
              Logout
            </button>
          ) : (
            <Link className={style.link} onClick={handleSidebar} to="/sign_in">
              <li className={style.list}>
                <AiOutlineLogin />
                Log In
              </li>
            </Link>
          )}
        </ul>
        <div className="mt-[40%]">
          <img className="airline_giphy" alt="airline_giphy" src={airline} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
