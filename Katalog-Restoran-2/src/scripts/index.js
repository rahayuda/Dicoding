import '../styles/main.scss';
import './_components/AppBar/AppBar';
import './_components/Footer/Footer';
import './views/pages/Home/_components/Hero/Hero';
import './views/pages/Home/_components/ListRestaurant/ListRestaurant';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('.nav__list'),
  content: document.querySelector('#main-content'),
  skipLink: document.querySelector('.skip-to-content'),
});

document.addEventListener('DOMContentLoaded', async () => {
  await app.renderPage();
  if (process.env.NODE_ENV === 'production') {
    await swRegister();
  }
});

window.addEventListener('hashchange', async () => {
  await app.renderPage();
});
