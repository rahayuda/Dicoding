import './Hero.scss';

class Hero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="hero">
        <div class="hero__content">
          <h1 class="hero__main-title">
          Find the Best Restaurant and Cafe in the World
          </h1>
          <p class="hero__description">Look for the best restaurantas and cafe in the world with a variety of typical food s from each region. </p>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-app', Hero);
