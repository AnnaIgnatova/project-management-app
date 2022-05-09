import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        pages: {
          welcome: 'welcome',
          main: 'main',
          login: 'login',
          registration: 'registration',
          user: 'user',
          board: 'board',
          notFound: 'not found',
        },
      },
    },
    ru: {
      translation: {
        pages: {
          welcome: 'начальная',
          main: 'главная',
          login: 'авторизация',
          registration: 'регистрация',
          user: 'пользователь',
          board: 'доска',
          notFound: 'не найдено',
        },
      },
    },
  },
});

export default i18n;
