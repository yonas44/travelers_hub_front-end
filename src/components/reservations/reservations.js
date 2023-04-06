import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import FilterOptions from '../filterOptions';
import './reservations.css';
import load from '../../assets/load.gif';
import Reservation from './singleReservation';
import getReservations from '../../redux/reservations/getReservations';

const Reservations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    setUser(localStorage.getItem('user'));
    dispatch(getReservations());
  }, [dispatch, navigate]);

  const allBookings = useSelector((state) => state.reservations);
  const bookings = allBookings.data.filter((booking) => {
    if (allBookings.selected === 'All') {
      if (booking.package.title.toLowerCase().includes(allBookings.filterby)) {
        return true;
      }
    } else if (
      booking.user_id === Number(user)
      && booking.package.title.toLowerCase().includes(allBookings.filterby)
    ) {
      return true;
    }
    return false;
  });

  return (
    <main>
      {allBookings.pending ? (
        <div className="loading-wrapper">
          <img id="loading-gif" src={load} alt="loading-img" />
        </div>
      ) : (
        <>
          <p className={`removed-message ${message && 'slide'}`}>{message}</p>
          <FilterOptions />
          <section className="reservations-holder">
            {bookings.length ? (
              bookings.map((booking) => (
                <Reservation
                  key={booking.id}
                  booking={booking}
                  setMessage={setMessage}
                  user={user}
                />
              ))
            ) : (
              <p>{allBookings.message}</p>
            )}
          </section>
        </>
      )}
      <Outlet />
    </main>
  );
};

export default Reservations;
