import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRouter from './App';
import { instanceAxios } from './services';
import './i18n';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store';
import axios from 'axios';

instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusText: string | undefined = error.response?.data?.message;
    if (axios.isAxiosError(error)) {
      if (statusText) {
        toast.error(`Oops... ${statusText}`);
      } else {
        toast.error(`Unexpected error (${error.response?.status}). Please try again later.`);
      }
    } else {
      toast.error('Unknown error. We are shocked too...');
    }
  }
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          transition={Flip}
          hideProgressBar
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
