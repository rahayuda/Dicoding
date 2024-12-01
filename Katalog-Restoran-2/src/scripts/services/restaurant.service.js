import { restaurantApi } from '../lib/axios';

export const GET_LIST_RESTAURANT = async () => await restaurantApi.get('/list');

export const GET_DETAIL_RESTAURANT = async (id) => await restaurantApi.get(`/detail/${id}`);

export const POST_ADD_REVIEW = async (data) => await restaurantApi.post('/review', data);
