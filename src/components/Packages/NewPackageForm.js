import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { GiCancel } from 'react-icons/gi';
import { MdAddCircle } from 'react-icons/md';
import addPackage from '../../redux/Packages/addPackage';

const NewPackageForm = () => {
  const dispatch = useDispatch();
  const initialState = {
    title: '',
    description: '',
    price: 0,
    destination: '',
    photo: [],
    accomodation: '',
    bus: false,
    flight: false,
    promotion: 0,
  };

  const [info, setInfo] = useState(initialState);
  const [photoLink, setPhoto] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPackage(info));
    setInfo(initialState);
    setPhoto('');
  };

  const handleInsert = () => {
    setInfo((state) => ({
      ...state,
      photo: [...state.photo, photoLink],
    }));
    setPhoto('');
  };

  const handleRemove = (index) => {
    setInfo((state) => ({
      ...state,
      photo: state.photo.filter((pic, i) => i !== index),
    }));
  };

  const handleChange = (inp) => {
    if (inp.target.name === 'title') {
      setInfo((state) => ({
        ...state,
        title: inp.target.value,
      }));
    } else if (inp.target.name === 'description') {
      setInfo((state) => ({
        ...state,
        description: inp.target.value,
      }));
    } else if (inp.target.name === 'destination') {
      setInfo((state) => ({
        ...state,
        destination: inp.target.value,
      }));
    } else if (inp.target.name === 'photo') {
      setPhoto(() => inp.target.value);
    } else if (inp.target.name === 'price') {
      setInfo((state) => ({
        ...state,
        price: inp.target.value,
      }));
    } else if (inp.target.name === 'accomodation') {
      setInfo((state) => ({
        ...state,
        accomodation: inp.target.value,
      }));
    } else if (inp.target.name === 'bus') {
      setInfo((state) => ({
        ...state,
        bus: !state.bus,
      }));
    } else if (inp.target.name === 'promotion') {
      setInfo((state) => ({
        ...state,
        promotion: inp.target.value,
      }));
    } else if (inp.target.name === 'flight') {
      setInfo((state) => ({
        ...state,
        flight: !state.flight,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-package-form">
      <input
        type="text"
        value={info.title}
        name="title"
        placeholder="Title"
        required
        onChange={handleChange}
      />
      <textarea
        type="text"
        value={info.description}
        name="description"
        required
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        type="text"
        value={info.destination}
        name="destination"
        required
        placeholder="Destination"
        onChange={handleChange}
      />
      <div className="package-image-holder">
        <input
          type="text"
          value={photoLink}
          name="photo"
          disabled={info.photo.length > 2}
          placeholder="Photo(url)"
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleInsert}
          id="add-image-btn"
          disabled={info.photo.length > 2}
        >
          <MdAddCircle />
        </button>
      </div>
      <div className="add-images-container">
        {info.photo.map((pic, index) => (
          <div key={uuidv4()} className="new-img-wrapper">
            <GiCancel
              className="remove-img"
              onClick={() => handleRemove(index)}
            />
            <img src={pic} alt="added_img" className="added_img" />
          </div>
        ))}
      </div>
      <label htmlFor="Price">
        Price: $
        <input
          type="number"
          value={info.price}
          name="price"
          required
          placeholder="Price"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="promotion">
        Promotion(discount): %
        <input
          type="number"
          value={info.promotion}
          name="promotion"
          required
          placeholder="Promotion"
          onChange={handleChange}
        />
      </label>
      <select
        value={info.accomodation}
        onChange={handleChange}
        name="accomodation"
        required
      >
        <option value="">-- Please select one hotel --</option>
        <option value="the-plaza">The Plaza</option>
        <option value="the-ritz-carlton">The Ritz-Carlton</option>
        <option value="four-seasons">Four Seasons</option>
        <option value="waldorf-astoria">Waldorf Astoria</option>
        <option value="mandarin-oriental">Mandarin Oriental</option>
        <option value="st-regis">St. Regis</option>
        <option value="intercontinental">InterContinental</option>
        <option value="hyatt-regency">Hyatt Regency</option>
        <option value="fairmont">Fairmont</option>
        <option value="sheraton">Sheraton</option>
        <option value="hilton">Hilton</option>
        <option value="marriott">Marriott</option>
        <option value="westin">Westin</option>
        <option value="ritz-carlton-reserve">Ritz-Carlton Reserve</option>
        <option value="rosewood">Rosewood</option>
      </select>
      <label htmlFor="flight">
        <input
          type="checkbox"
          checked={info.flight}
          name="flight"
          onChange={handleChange}
        />
        Flight
      </label>
      <label htmlFor="bus">
        <input
          type="checkbox"
          checked={info.bus}
          name="bus"
          onChange={handleChange}
        />
        Bus
      </label>
      <input type="submit" id="create-package-btn" value="Create package" />
    </form>
  );
};

export default NewPackageForm;