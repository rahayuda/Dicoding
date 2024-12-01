import '../styles/main.scss';
import './_components/AppBar/AppBar';
import './_components/Footer/Footer';
import './_components/Hero/Hero';
import './_components/ListRestaurant/ListRestaurant';

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.getElementById('hamburger');

  hamburgerButton.addEventListener('click', () => {
    const navList = document.querySelector('.nav__list');
    navList.classList.toggle('active');
  });
});
