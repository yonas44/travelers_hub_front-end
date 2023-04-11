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
  const [current, setCurrent] = useState();
  const [message, setMessage] = useState('');

  const allBookings = useSelector((state) => state.reservations);
  const bookings = allBookings.data.filter((booking) => {
    if (allBookings.selected === 'All') {
      if (booking.package.title.toLowerCase().includes(allBookings.filterby)) {
        return true;
      }
    } else if (
      booking.user_id === Number(current)
      && booking.package.title.toLowerCase().includes(allBookings.filterby)
    ) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (!sessionStorage.getItem('current')) navigate('/sign_in');
    setCurrent(sessionStorage.getItem('current'));
    dispatch(getReservations());
    setMessage(allBookings.message);
  }, [allBookings.change]);
  // console.log(bookings);

  return (
    <main className="reservation-main">
      {allBookings.pending ? (
        <div className="loading-wrapper">
          <img id="loading-gif" src={load} alt="loading-img" />
        </div>
      ) : (
        <>
          <p className={`removed-message ${message && 'slide'}`}>{message}</p>
          <FilterOptions />
          <section className="reservations-holder">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Reservation
                  key={booking.id}
                  packageImage={booking.package.photo[0]}
                  bookingAuthorId={booking.user_id}
                  bookingId={booking.id}
                  packageTitle={booking.package.title}
                  bookingDestination={booking.package.destination}
                  current={current}
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
