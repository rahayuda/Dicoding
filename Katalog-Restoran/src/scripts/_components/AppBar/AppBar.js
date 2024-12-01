import logo from '../../../public/images/logo/restaurant.png';
import './AppBar.scss';

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="nav">
      <div class="nav__logo">
        <img src="${logo}" alt="Restaurant app logo" width="60" />
      </div>
        
        <a aria-label="hamburger-button" href="#" id="hamburger" class="nav-hamburger__button">☰</a>
        
        <ul class="nav__list">
          <li class="nav__item">
            <a href="/" class="nav__link">Home</a>
          </li>
          <li class="nav__item">
            <a href="#" class="nav__link">Favorite</a>
          </li>
          <li class="nav__item">
            <a href="https://www.linkedin.com/in/i-gede-surya-rahayuda-048481133/" class="nav__link" target="_blank">About Us</a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
