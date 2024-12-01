import { openDB } from 'idb';

const CONFIG = {
  DATABASE_NAME: 'restaurant-app-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
};

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },

  async clearAllRestaurants() {
    return (await dbPromise).clear(OBJECT_STORE_NAME);
  },

  // Menambahkan metode untuk menghapus seluruh database
  async deleteDatabase() {
    const db = await dbPromise;
    db.close();
    const request = indexedDB.deleteDatabase(DATABASE_NAME);
    request.onsuccess = () => {
      console.log('Database berhasil dihapus');
    };
    request.onerror = (event) => {
      console.log('Terjadi kesalahan saat menghapus database', event);
    };
  },

};

export default FavRestaurantIdb;
