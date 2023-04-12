import React from 'react';
import { useDispatch } from 'react-redux';
import {
  filterReservations,
  selectedReservations,
} from '../redux/reservations/reservationSlice';

const FilterOptions = () => {
  const dispatch = useDispatch();

  const handleSelect = (event) => {
    dispatch(selectedReservations(event.target.value));
  };

  const handleSearch = (event) => {
    dispatch(filterReservations(event.target.value));
  };

  return (
    <div className="filter-options">
      <select id="filter-by" onChange={handleSelect}>
        <option>All</option>
        <option>My</option>
      </select>
      <input
        placeholder="Search reservations..."
        data-testid="search-bar"
        id="search-bar"
        onChange={handleSearch}
      />
    </div>
  );
};

export default FilterOptions;
