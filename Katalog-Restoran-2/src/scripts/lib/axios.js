import axios from 'axios';

const restaurantApi = axios.create({
  baseURL: 'https://restaurant-api.dicoding.dev',
});

const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

export { restaurantApi, newsApi };
