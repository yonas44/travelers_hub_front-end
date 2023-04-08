import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiCommercialAirplane } from 'react-icons/gi';
import { fetchPackages } from '../redux/packageSlice';
import '../styles/packages/index.css';
import loading from '../images/loading-icon.gif';

const Package = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const packages = useSelector((state) => state.flightpackage);

  const style = {
    font: 'text-[17px] text-[#000] font-extrabold',
  };

  return (
    <section>
      <div className="grid md:ml-[320px] m-[10px] md:grid-cols-3 gap-2">
        {
          packages.loading ? (<img className="loading_giphy" alt="loading-giphy" src={loading} />) : (
            packages.flightpackage.map((flight) => (
              <div key={flight.id}>
                <Link className="no-underline" state={flight} to="/details">
                  <small className="absolute text-[#fff] flight_bool m-2 rounded-md bg-[#237bad]">
                    {
                      flight.flight ? (
                        <p className="flex gap-2 px-[3px] items-center">
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
                      <p className={style.text}>
                        $
                        {flight.price}
                      </p>
                    </div>
                    <small className={style.text}>{flight.destination}</small>
                  </div>
                </Link>
              </div>
            ))
          )
        }
      </div>
    </section>
  );
};

export default Package;
