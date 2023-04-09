import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './addPackage.css';
import addPackageImage from '../../assets/add_package.jpg';
import NewPackageForm from './NewPackageForm';

const AddPackage = () => {
  const packages = useSelector((state) => state.flightPackages);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('user')) navigate('/login');
    if (packages.error) {
      setError(packages.error);
    }
    if (packages.message) {
      setMessage(packages.message);
    }
  }, [packages]);

  return (
    <div className="add-package-wrapper">
      <p className={`added-message ${message && 'slide'}`}>{message}</p>
      <p className={`added-message-error ${error && 'slide'}`}>{error}</p>
      <div className="form-holder">
        <h2>Add a new package</h2>
        <div className="form-with-img">
          <img
            src={addPackageImage}
            id="add_package_img"
            alt="add_package_img"
          />
          <NewPackageForm setMessage={setMessage} setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default AddPackage;