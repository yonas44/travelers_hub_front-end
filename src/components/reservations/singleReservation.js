import React from 'react';
import { BiWorld } from 'react-icons/bi';
import { GiCheckMark } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import deleteReservation from '../../redux/reservations/deleteReservations';

const Reservation = (props) => {
  const {
    packageImage,
    bookingAuthorId,
    bookingId,
    current,
    bookingDestination,
    packageTitle,
  } = props;
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure, you want to delete it?');
    if (confirmed) {
      dispatch(deleteReservation(id));
    }
  };

  return (
    <div className="reservation">
      <img id="package-img" src={packageImage} alt="package-img" />
      {Number(current) === bookingAuthorId && (
        <span id="booking-owner-badge">Owned</span>
      )}
      <div className="reservation-info">
        <h3>{packageTitle}</h3>
        <p>
          Booked
          <GiCheckMark id="check-mark" />
        </p>
        <p id="destination-info">
          <BiWorld />
          {bookingDestination}
        </p>
      </div>
      {Number(current) === bookingAuthorId && (
        <div className="owner-options">
          <button type="button" id="remove-reservation-btn">
            <RiDeleteBin5Fill
              className="current-btns"
              onClick={() => handleDelete(bookingId)}
            />
          </button>
        </div>
      )}
    </div>
  );
};

Reservation.defaultProps = {
  current: null,
  packageImage: null,
  bookingAuthorId: null,
  bookingId: null,
  bookingDestination: null,
  packageTitle: null,
};

Reservation.propTypes = {
  current: PropTypes.string,
  packageImage: PropTypes.string,
  bookingAuthorId: PropTypes.number,
  bookingId: PropTypes.number,
  bookingDestination: PropTypes.string,
  packageTitle: PropTypes.string,
};

export default Reservation;
