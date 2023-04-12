import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiCommercialAirplane } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../redux/packageSlice';
import loading from '../images/loading-icon.gif';
import comingSoon from '../images/coming-soon.jpeg';

const Promotions = () => {
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
          packages.loading ? (
            <img className="loading_giphy" alt="loading-giphy" src={loading} />
          ) : (
            packages.flightpackage.map((flight) => (
              <div className="bg-[#fff] h-full" key={flight.id}>
                <Link className="no-underline" state={flight} to="/details">
                  {
                    flight.promotion > 10 ? (
                      <div>
                        <small className="absolute text-[#fff] flight_bool m-2 rounded-md bg-[#237bad]">
                          {flight.flight ? (
                            <p className="flex gap-2 px-[3px] items-center">
                              Flight: Included
                              <span>
                                <GiCommercialAirplane />
                              </span>
                            </p>
                          ) : (
                            ''
                          )}
                        </small>
                        <small className="absolute ml-[20%] flight_bool mt-2 rounded-md text-[#fff] bg-[#c71310]">
                          {
                            flight.promotion > 10 ? (
                              <p className="px-[3px]">
                                {flight.promotion}
                                %
                              </p>
                            ) : (
                              ''
                            )
                          }
                        </small>
                        <div>
                          <img
                            className="w-full h-[280px]"
                            alt={flight.title}
                            src={flight.photo}
                          />
                        </div>
                        <div className="p-[15px]">
                          <div className="flex flex-wrap items-center justify-between">
                            <h1 className={style.font} key={flight.id}>
                              {flight.title}
                            </h1>
                            <p className={style.text}>
                              $
                              {flight.price}
                            </p>
                          </div>
                          <small className={style.text}>{flight.destination}</small>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <img alt="coming soon" className="h-[280px]" src={comingSoon} />
                        <div className="flex flex-col justify-center items-center my-4">
                          <p className="text-center">{flight.title}</p>
                          <p className="text-[#c71310]">Promotion coming soon</p>
                        </div>
                      </div>
                    )
                  }
                </Link>
              </div>
            ))
          )
        }
      </div>
    </section>
  );
};

export default Promotions;
