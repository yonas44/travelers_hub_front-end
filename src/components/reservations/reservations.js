import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilterOptions from '../filterOptions';
import './reservations.css';
import load from '../../images/loading-icon.gif';
import Reservation from './singleReservation';
import getReservations from '../../redux/reservations/getReservations';
import { flash } from '../../redux/flash/flash';

const Reservations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState();

  const { user } = useSelector((state) => state.auth);

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
    if (!sessionStorage.getItem('user')) navigate('/sign_in');
    else {
      setCurrent(JSON.parse(sessionStorage.getItem('current')).id);
      dispatch(getReservations());
    }
    if (allBookings.message) flash('success', allBookings.message);
    else if (allBookings.err) flash('error', allBookings.err);
  }, [allBookings.change, user]);

  return (
    <main className="reservation-main">
      {allBookings.pending ? (
        <div className="loading-wrapper">
          <img id="loading-gif" src={load} alt="loading-img" />
        </div>
      ) : (
        <>
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
                  startDate={booking.start_time}
                  endDate={booking.end_time}
                />
              ))
            ) : (
              <p>There are no bookings to display</p>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default Reservations;
