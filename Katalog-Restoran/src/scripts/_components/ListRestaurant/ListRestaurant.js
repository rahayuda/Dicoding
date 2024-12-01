import dataRestaurant from '../../../data/DATA.json';
import '../RestaurantItem/RestaurantItem';
import './ListRestaurant.scss';

class ListRestaurant extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderData();
  }

  fetchData() {
    return dataRestaurant.restaurants;
  }

  renderData() {
    const containerRestaurant = this.querySelector('.list_restaurant__container');
    const data = this.fetchData();

    data.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.dataRestaurant = restaurant;
      containerRestaurant.appendChild(restaurantItemElement);
    });
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
      </section>
    `;
  }
}

customElements.define('list-restaurant', ListRestaurant);
