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
          Fork and Spoon: Discover the Best Global Dining
          </h1>
          <p class="hero__description">Explore the best global dining at Fork and Spoon, where regional flavors and unique dishes come together for an unforgettable culinary experience. </p>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-app', Hero);
