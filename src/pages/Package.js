import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiCommercialAirplane } from 'react-icons/gi';
import { fetchPackages } from '../redux/packageSlice';
import '../styles/packages/index.css';

const Package = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const packages = useSelector((state) => state.flightpackage);

  const style = {
    font: 'text-[17px] font-extrabold',
  };

  return (
    <div className="grid md:ml-[320px] m-[10px] md:grid-cols-3 gap-2">
      {
        packages.loading ? (<p>loading...</p>) : (
          packages.flightpackage.map((flight) => (
            <div key={flight.id}>
              <Link state={flight} to="/details">
                <small className="absolute text-[#fff] m-2 rounded-md p-[3px] bg-[#237bad]">
                  {
                    flight.flight ? (
                      <p className="flex gap-2 items-center">
                        Flight: Included
                        <span><GiCommercialAirplane /></span>
                      </p>
                    ) : ''
                  }
                </small>
                <div><img className="w-full" alt={flight.title} src={flight.photo} /></div>
                <div className="bg-[#fff] p-[15px] packages">
                  <div className="flex items-center justify-between">
                    <h1 className={style.font} key={flight.id}>{flight.title}</h1>
                    <p>
                      $
                      {flight.price}
                    </p>
                  </div>
                  <small>{flight.destination}</small>
                </div>
              </Link>
            </div>
          ))
        )
      }

    </div>
  );
};

export default Package;
