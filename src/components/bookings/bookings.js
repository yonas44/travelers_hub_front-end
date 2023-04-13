/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-multi-date-picker';
import './bookings.css';
import { Navigate, useNavigate } from 'react-router-dom';
import postReservations from '../../redux/reservations/postReservations';
import { fetchPackages } from '../../redux/packageSlice';
import { getToken } from '../../redux/auth/auth';

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const packages = useSelector((state) => state.flightpackage);

  const [startDate, setStartDate] = useState('Choose Start Date');
  const [endDate, setEndDate] = useState('Choose End Date');
  const [selectedPackage, setSelectedPackage] = useState(
    packages.flightpackage[0]?.id,
  );

  const handleSelectChange = (event) => {
    setSelectedPackage(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postObject = {
      start_time: startDate.toString(),
      end_time: endDate.toString(),
      package_id: selectedPackage,
    };

    dispatch(postReservations(postObject));
    navigate('/reservations');
  };

  useEffect(() => {
    if (!packages.flightpackage.length) {
      dispatch(fetchPackages());
    }
  }, []);

  return (
    <div className="booking-container">
      <div>
        <p className="form-title form-title-1">Collect Moments,</p>
        <p className="form-title form-title-2">Not Things</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="start-date">
          <DatePicker
            inputClass="start-date-input"
            value={startDate}
            onChange={setStartDate}
            format="DD/MM/YYYY"
            placeholder="Start Date"
          />
        </div>

        <div className="end-date">
          <DatePicker
            inputClass="end-date-input"
            value={endDate}
            onChange={setEndDate}
            format="DD/MM/YYYY"
            placeholder="End Date"
          />
        </div>

        <br />

        <div className="booking-buttons-div">
          <select value={selectedPackage} onChange={handleSelectChange}>
            {packages.loading ? (
              <p>loading...</p>
            ) : (
              packages.flightpackage.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))
            )}
          </select>
          <input className="form-button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default function Bookings() {
  const isAuthenticated = getToken();

  if (!isAuthenticated) {
    return <Navigate to="/sign_in" />;
  }

  return <BookingForm />;
}
