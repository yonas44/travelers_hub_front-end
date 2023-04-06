import React from 'react';
import { useDispatch } from 'react-redux';
import { BiWorld } from 'react-icons/bi';
import { GiCheckMark } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { PropTypes } from 'prop-types';
import deleteReservation from '../../redux/reservations/deleteReservations';
import getReservations from '../../redux/reservations/getReservations';

const Reservation = (props) => {
  const { booking, user, setMessage } = props;

  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure, you want to delete it?');
      if (confirmed) {
        const data = await deleteReservation(id);
        setMessage(data.message);
        dispatch(getReservations());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reservation">
      <img id="package-img" src={booking.package.photo[0]} alt="package-img" />
      {Number(user) === booking.user_id && (
        <span id="booking-owner-badge">Owned</span>
      )}
      <div className="reservation-info">
        <h3>{booking.package.title}</h3>
        <p>
          Booked
          <GiCheckMark id="check-mark" />
        </p>
        <p>
          <BiWorld />
          {booking.package.destination}
        </p>
      </div>
      {Number(user) === booking.user_id && (
        <div className="owner-options">
          <button type="button" id="remove-reservation-btn">
            <RiDeleteBin5Fill
              className="user-btns"
              onClick={() => handleDelete(booking.id)}
            />
          </button>
        </div>
      )}
    </div>
  );
};

Reservation.defaultProps = {
  setMessage: null,
  user: null,
  booking: null,
};

Reservation.propTypes = {
  setMessage: PropTypes.func,
  user: PropTypes.string,
  booking: PropTypes.string,
};

export default Reservation;
