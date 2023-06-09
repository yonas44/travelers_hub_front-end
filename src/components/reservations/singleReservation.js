import React, { useState } from 'react';
import { BiWorld } from 'react-icons/bi';
import { GiCheckMark } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { PropTypes } from 'prop-types';
import DeleteModal from '../deleteModal';

const Reservation = (props) => {
  const {
    packageImage,
    bookingAuthorId,
    bookingId,
    current,
    bookingDestination,
    packageTitle,
    startDate,
    endDate,
  } = props;

  const [show, setShow] = useState(false);

  return (
    <>
      <div className="reservation">
        <img id="package-img" src={packageImage} alt="package-img" />
        {Number(current) === bookingAuthorId && (
          <span id="booking-owner-badge">Owned</span>
        )}
        <div className="reservation-info py-4">
          <h3>{packageTitle}</h3>
          <p className="flex gap-[10px] items-center">
            <GiCheckMark id="check-mark" />
            Booked on
            <span className="text-[#959595] italic">{startDate}</span>
          </p>
          <p className="flex gap-[8px] items-center">
            Ends on
            <span className="text-[#959595] italic">{endDate}</span>
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
        <DeleteModal typeOf="reservation" setShow={setShow} id={bookingId} />
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
  startDate: null,
  endDate: null,
};

Reservation.propTypes = {
  current: PropTypes.number,
  packageImage: PropTypes.string,
  bookingAuthorId: PropTypes.number,
  bookingId: PropTypes.number,
  bookingDestination: PropTypes.string,
  packageTitle: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default Reservation;
