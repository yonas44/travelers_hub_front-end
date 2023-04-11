import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { resetStateAndKeepFlash, signup } from '../redux/auth/auth';
import { flash } from '../redux/flash/flash';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      flash('error', 'Passwords do not match');
      return;
    }

    dispatch(signup({ username, password }));
  };

  if (success) {
    dispatch(resetStateAndKeepFlash());
    navigate('/sign_in');
  }

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <ToastContainer />
      <div className="card w-25">
        <div className="card-header text-center">
          <h1>Register</h1>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="form-floating my-3">
              <input
                type="text"
                id="_username"
                name="_username"
                value={username}
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="_username">Username</label>
            </div>

            <div className="d-flex align-items-center form-floating my-3">
              <input
                type="password"
                id="_password"
                name="_password"
                value={password}
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="_password">Password</label>
            </div>

            <div className="form-floating my-3">
              <input
                type="password"
                id="_confirm_password"
                name="_confirm_password"
                value={confirmPassword}
                className="form-control"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="_password">Confirm Password</label>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
      <p className="mt-3">
        Already have an account?
        <Link to="/sign_in">Sign in</Link>
      </p>
    </div>
  );
}
