import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPackages } from '../redux/packageSlice';

const Package = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const packages = useSelector((state) => state.flightpackage);
  console.log('we changed', packages);

  return (
    <div>
      <h1>hello dear</h1>
      <div>
        {
          packages.loading ? (<p>loading...</p>) : (
            packages.flightpackage.map((flight) => (
              <h1 key={flight.id}>{flight.title}</h1>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Package;
