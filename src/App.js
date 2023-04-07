import React from 'react';
import {
  createHashRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';

export default function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/sign_in" element={<Login />} />
      </Route>,
    ),
  );

  return (
    <RouterProvider router={router} />
  );
}
