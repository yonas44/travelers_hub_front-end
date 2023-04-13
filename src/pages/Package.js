import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiCommercialAirplane } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { fetchPackages } from '../redux/packageSlice';
import '../styles/packages/index.css';
import loading from '../images/loading-icon.gif';
import DeleteModal from '../components/deleteModal';
import '../components/packages/packages.css';
import { flash } from '../redux/flash/flash';

const Package = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) flash('success', message);
    else if (error) flash('error', error);
    dispatch(fetchPackages());
  }, [change, success]);

  const packages = useSelector((state) => state.flightpackage);

  const style = {
    font: 'text-[17px] text-[#000] font-extrabold',
  };
  return (
    <>
      <section>
        <div className="grid md:ml-[320px] m-[10px] md:grid-cols-3 gap-2">
          {packages.loading ? (
            <img className="loading_giphy" alt="loading-giphy" src={loading} />
          ) : (
            packages.flightpackage.map((flight) => (
              <div className="bg-[#fff] h-full package-info" key={flight.id}>
                <Link className="no-underline" state={flight} to="/details">
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
                    {flight.promotion > 10 ? (
                      <p className="px-[3px]">{flight.promotion}%</p>
                    ) : (
                      ''
                    )}
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
                      <p className={style.text}>${flight.price}</p>
                    </div>
                    <small className={style.text}>{flight.destination}</small>
                  </div>
                </Link>
                {Number(current) === flight.user_id && (
                  <div className="owner-options">
                    <button type="button" id="remove-package-btn">
                      <RiDeleteBin5Fill
                        data-testid="delete-btn"
                        className="current-btns"
                        onClick={() => {
                          setShow(true);
                          setId(flight.id);
                        }}
                      />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
          {show && <DeleteModal typeOf="package" setShow={setShow} id={Id} />}
        </div>
      </section>
    </>
  );
};

export default Package;
