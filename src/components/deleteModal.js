import React from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import deleteReservation from '../redux/reservations/deleteReservations';
import deletePackage from '../redux/packages/deletePackage';

const DeleteModal = ({ typeOf, id, setShow }) => {
  const dispatch = useDispatch();

  const handleConfirm = (inp) => {
    if (inp.target.textContent === 'Ok') {
      if (typeOf === 'reservation') dispatch(deleteReservation(id));
      else dispatch(deletePackage(id));
    }
    setShow(false);
  };

  return (
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
  );
};

DeleteModal.defaultProps = {
  typeOf: null,
  id: null,
  setShow: null,
};

DeleteModal.propTypes = {
  typeOf: PropTypes.string,
  id: PropTypes.number,
  setShow: PropTypes.func,
};

export default DeleteModal;
