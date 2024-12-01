import '../../../../../_components/RestaurantItem/RestaurantItem';
import './ListRestaurant.scss';

class ListRestaurant extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="list_restaurant">
        <header class="list_restaurant__header">
          <h2 class="list_restaurant__main-title">
            List Restaurant
          </h2>
        </header>
        
        <div class="list_restaurant__container">
          
        </div>
        <div class="error__container">
        
        </div>
      </section>
    `;
  }
}

customElements.define('list-restaurant', ListRestaurant);
