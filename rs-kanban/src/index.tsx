import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRouter from './App';
import { AxiosError } from 'axios';
import { instanceAxios } from './services';
import './i18n';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { HttpStatus, ToastMessage } from './services/api-service/http-status';

instanceAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatus.BAD_REQUEST:
        toast.error(ToastMessage.BAD_REQUEST);
        break;
      case HttpStatus.UNAUTHORIZED:
        toast.error(ToastMessage.UNAUTHORIZED);
        break;
      case HttpStatus.NOT_FOUND:
        toast.error(ToastMessage.NOT_FOUND);
        break;
      case HttpStatus.CONFLICT:
        toast.error(ToastMessage.CONFLICT);
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        toast.error(ToastMessage.INTERNAL_SERVER_ERROR);
        break;
      default:
        break;
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
