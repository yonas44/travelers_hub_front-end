import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { cleanFlash } from '../redux/auth/auth';
import { flash } from '../redux/flash/flash';

// eslint-disable-next-line
const Navbar = ({ handleSidebar, sidebar }) => {
  const style = {
    text: 'text-[27px] sidebar_title px-4 text-[#1c1cc7] font-extrabold py-[7px]',
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
    <div className="md:hidden bg-[#fff] sticky top-0 w-full">
      <div className="flex justify-between items-center">
        <h1 className={style.text}>Travellers Hub</h1>
        {/* eslint-disable-next-line */}
        <button onClick={handleSidebar} className="px-4" type="button">
          {!sidebar ? <GiHamburgerMenu /> : <GrClose />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
