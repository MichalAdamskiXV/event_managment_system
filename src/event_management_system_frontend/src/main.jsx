import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import NavBar from "./components/NavBar"
import Event from "./pages/showEvent/Event"
import CreateEvent from "./pages/createEvent/CreateEvent"
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/createEvent',
        element: <CreateEvent />
      },
      {
        path: '/event/:id',
        element: <Event />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
