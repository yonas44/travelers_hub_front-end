import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPackages } from '../redux/packageSlice';

const Package = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const packages = useSelector((state) => state.flightpackage);

  return (
    <div>
      <div>
        {
          packages.loading ? (<p>loading...</p>) : (
            packages.flightpackage.map((flight) => (
              <div key={flight.id}>
                <div><img alt={flight.title} src={flight.photo} /></div>
                <div>
                  <h1 key={flight.id}>{flight.title}</h1>
                  <p>
                    $
                    {flight.price}
                  </p>
                </div>
                <p className="flex font-[60px] text-[#fff]">{flight.destination}</p>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Package;
