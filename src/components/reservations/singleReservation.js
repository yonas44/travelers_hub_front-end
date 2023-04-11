import React, { useState } from 'react';
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

  const [show, setShow] = useState(false);

  const handleConfirm = (inp) => {
    if (inp.target.textContent === 'Ok') {
      dispatch(deleteReservation(bookingId));
    }
    setShow(false);
  };

  return (
    <>
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
                data-testid="delete-btn"
                className="current-btns"
                onClick={() => setShow(true)}
              />
            </button>
          </div>
        )}
      </div>
      {show && (
        <div className="delete-confirm-wrapper">
          <div className="delete-reservation-popop">
            <p>Are you sure, you want to delete it?</p>
            <div className="confirm-buttons-wrapper">
              <button
                type="button"
                className="delete-reservation-cancel"
                onClick={handleConfirm}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-reservation-ok"
                onClick={handleConfirm}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
  current: PropTypes.number,
  packageImage: PropTypes.string,
  bookingAuthorId: PropTypes.number,
  bookingId: PropTypes.number,
  bookingDestination: PropTypes.string,
  packageTitle: PropTypes.string,
};

export default Reservation;
