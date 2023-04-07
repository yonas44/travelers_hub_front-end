import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const PackageDetails = () => {
  const location = useLocation();
  const flightpackage = location.state;
  const style = {
    text: 'text-[14px] font-extrabold',
  };
  return (
    <div className="md:ml-[320px] mb-[10px]">
      <h1 className="mt-[50px] text-center text-[45px]">{flightpackage.title}</h1>
      <small className="block text-center text-[18px] text-[#008000] my-2">{flightpackage.destination}</small>
      <div className="md:flex m-4 items-start">
        <div>
          <img alt={flightpackage.title} className="packageDetails_img rounded-md" src={flightpackage.photo} />
        </div>
        <div>
          <p>{flightpackage.description}</p>
          <p className={style.text}>
            Price
            <small className="package_details">
              $
              {flightpackage.price}
            </small>
          </p>
          <p className={style.text}>
            Accomodation:
            <span className="package_detail">{flightpackage.accomodation}</span>
          </p>
          <p className={style.text}>
            Promotions
            <small className="package_details">
              {flightpackage.promotion}
              %
            </small>
          </p>
          <p className={style.text}>
            {
              flightpackage.flight ? (
                <p>
                  Flight:
                  <span className="package_detail"> Included</span>
                </p>
              ) : (
                <p>Flight: not included</p>
              )
            }
          </p>
          <Link to="/booking"><button type="button" className="rounded-md my-4 bg-[#000] mb-2 text-[#fff] p-4">Book this package</button></Link>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
