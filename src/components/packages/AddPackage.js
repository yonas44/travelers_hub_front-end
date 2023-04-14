import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './addPackage.css';
import NewPackageForm from './NewPackageForm';
import { flash } from '../../redux/flash/flash';
import load from '../../images/loading-icon.gif';

const AddPackage = () => {
  const { message, err, loading } = useSelector((state) => state.flightpackage);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('user')) navigate('/sign_in');
    if (message) flash('success', message);
    else if (err) flash('error', err);
  }, [loading, user]);

  return (
    <div className="add-package-wrapper">
      <div className="form-holder">
        <h2>Add a new package</h2>
        <div className="form-with-img">
          <div id="add_package_img" alt="add_package_img" />
          <NewPackageForm />
        </div>
      </div>
      {loading && (
        <div className="loading-wrapper">
          <img id="loading-gif" src={load} alt="loading-img" />
        </div>
      )}
    </div>
  );
};

export default AddPackage;
