import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/homePage/Home';
import NavBar from "./components/NavBar"
import Event from "./pages/showEvent/Event"
import CreateEvent from "./pages/createEvent/CreateEvent"
import './index.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import FinalOrder from "./pages/finalizingOrder/FinalOrder";
import HotEvents from "./pages/hotEvents/HotEvents";
import SearchPage from "./pages/search/SearchPage"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PaymentLayout from './pages/payment/PaymentLayout';

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
        path: '/event/:eventId',
        element: <Event />
      }, 
      {
        path: '/hotEvents',
        element: <HotEvents />
      },
      {
        path: '/search',
        element: <SearchPage />
      }
    ]
  },
  {
    path: '/payment/:paymentEventId/:paymentEmail/:price',
    element: <PaymentLayout />
  },
  {
    path: '/finalizingOrder/:finalEventId',
    element: <FinalOrder />
  }
])

const PayPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const initialOptions = {
  "client-id": PayPalClientId
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <RouterProvider router={router}/>
    </PayPalScriptProvider>
  </React.StrictMode>,
);
