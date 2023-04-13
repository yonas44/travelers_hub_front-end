import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { signin } from '../redux/auth/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(signin({ username, password }));
  };

  if (user) {
    navigate('/');
  }

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="card w-25" style={{ minWidth: 300 }}>
        <div className="card-header text-center">
          <h1>Sign in</h1>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="form-floating my-3">
              <input
                type="text"
                id="_username"
                name="_username"
                className="form-control"
                placeholder="Username"
                value={username}
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
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="_password">Password</label>
            </div>
            <button type="submit" className="d-none">Submit</button>
          </form>
        </div>
        <div className="card-footer">
          <button type="button" className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
      <p className="mt-3">
        Don&apos;t have an account?
        <Link to="/sign_up">Sign up</Link>
      </p>
    </div>
  );
}
