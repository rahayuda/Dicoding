import FavoriteRestaurant from '../views/pages/FavoriteRestaurant/FavoriteRestaurant';
import DetailRestaurant from '../views/pages/DetailRestaurant/DetailRestaurant';
import Home from '../views/pages/Home/Home';

const routes = {
  '/': Home,
  '/favorite-restaurants': FavoriteRestaurant,
  '/restaurants/:id': DetailRestaurant,
};

export default routes;
