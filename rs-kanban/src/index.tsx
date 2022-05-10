import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRouter from './App';
import { AxiosError } from 'axios';
import { instanceAxios } from './services';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

instanceAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    toast.error(error.message);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Flip}
        hideProgressBar
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </React.StrictMode>
);
