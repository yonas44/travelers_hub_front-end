import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import './bookings.css';

const BookingForm = () => {
  const [startDate, setStartDate] = useState('Choose Start Date');
  const [endDate, setEndDate] = useState('Choose End Date');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
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
      </form>
    </div>
  );
};

export default function Bookings() {
  return <BookingForm />;
}
