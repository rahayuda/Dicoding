import './_components/Hero/Hero';
import '../../../_components/Skeleton/Skeleton';
import './_components/ListRestaurant/ListRestaurant';
import '../../../_components/RestaurantItem/RestaurantItem';
import '../../../_components/StatusMessage/StatusMessage';
import { GET_LIST_RESTAURANT } from '../../../services/restaurant.service';

const Home = {
  render() {
    return `
      <hero-app></hero-app>
      <list-restaurant></list-restaurant>
    `;
  },

  renderSkeleton(container) {
    container.innerHTML = Array(5).fill(
      '<skeleton-component height="300px"></skeleton-component>',
    ).join('');
  },

  renderRestaurants(container, restaurants) {
    container.innerHTML = '';
    restaurants.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.dataRestaurant = restaurant;
      container.appendChild(restaurantItemElement);
    });
  },

  renderError(container, errorContainer, error) {
    container.innerHTML = '';
    errorContainer.innerHTML = `
      <status-message message="${error?.response?.data?.message || 'Something when wrong'}"></status-message>
    `;
  },

  async afterRender() {
    const containerResult = document.querySelector('.list_restaurant__container');
    const errorContainer = document.querySelector('.error__container');

    try {
      this.renderSkeleton(containerResult);

      const data = await GET_LIST_RESTAURANT();
      this.renderRestaurants(containerResult, data.data.restaurants);
    } catch (error) {
      this.renderError(containerResult, errorContainer, error);
    }
  },
};

export default Home;
