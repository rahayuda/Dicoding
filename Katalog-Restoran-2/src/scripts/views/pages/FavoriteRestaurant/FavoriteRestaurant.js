import FavRestaurantIdb from '../../../../data/favorite-restaurant-idb';

const FavoriteRestaurant = {
  render() {
    return `
      <hero-app></hero-app>
      <list-restaurant></list-restaurant>
    `;
  },

  renderError(container, errorContainer, error) {
    container.innerHTML = '';
    errorContainer.innerHTML = `
      <status-message style="display: block; height:20vh;" message="${error}"></status-message>
    `;
  },

  async afterRender() {
    const data = await FavRestaurantIdb.getAllRestaurants();
    const restaurantContainer = document.querySelector('.list_restaurant__container');
    const errorContainer = document.querySelector('.error__container');

    if (data.length === 0) {
      this.renderError(restaurantContainer, errorContainer, 'Favorite restaurant is empty');
    }

    data.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.dataRestaurant = restaurant;
      restaurantContainer.appendChild(restaurantItemElement);
    });
  },
};

export default FavoriteRestaurant;
