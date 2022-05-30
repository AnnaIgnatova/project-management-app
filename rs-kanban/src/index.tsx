import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRouter from './AppRouter';
import { instanceAxios } from './services';
import './i18n';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store';

instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const toastMessage: string | undefined = error.response?.data?.message;
    if (toastMessage) {
      toast.error(toastMessage);
    } else {
      toast.error(`Unexpected error (${error.response?.status}). Please try again later.`);
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
