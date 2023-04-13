import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './addPackage.css';
import addPackageImage from '../../images/add_package.jpg';
import NewPackageForm from './NewPackageForm';
import { flash } from '../../redux/flash/flash';

const AddPackage = () => {
  const packages = useSelector((state) => state.flightpackage);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('user')) navigate('/sign_in');
    if (packages.message) flash('success', packages.message);
    else if (packages.err) flash('error', packages.err);
  }, [packages]);

  return (
    <div className="add-package-wrapper">
      <div className="form-holder">
        <h2>Add a new package</h2>
        <div className="form-with-img">
          <img
            src={addPackageImage}
            id="add_package_img"
            alt="add_package_img"
          />
          <NewPackageForm />
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
