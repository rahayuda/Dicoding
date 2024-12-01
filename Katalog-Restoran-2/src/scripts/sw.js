/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { clientsClaim, setCacheNameDetails } from 'workbox-core';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const oneMonthStoreInCache = 30 * 24 * 60 * 60;

clientsClaim();

setCacheNameDetails({
  prefix: 'Rubickone',
  precache: 'precache',
  runtime: 'runtime',
});

precacheAndRoute(
  [
    ...self.__WB_MANIFEST,
    {
      url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap',
      revision: 1,
    },
    {
      url: 'https://fonts.gstatic.com/s/quicksand/v29/6xKtdSZaM9iE8KbpRA_hJFQNYuDyP7bh.woff2',
      revision: 1,
    },
    {
      url: 'https://use.fontawesome.com/b070c8f1df.js',
      revision: 1,
    },
    {
      url: 'https://use.fontawesome.com/b070c8f1df.css',
      revision: 1,
    },
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  },
);

registerRoute(
  /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: oneMonthStoreInCache,
        maxEntries: 100,
      }),
    ],
  }),
);

registerRoute(
  /https:\/\/newsapi.org\/v2/,
  new StaleWhileRevalidate({
    cacheName: 'news-api',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: oneMonthStoreInCache,
        maxEntries: 100,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-restaurant',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: oneMonthStoreInCache,
      }),
    ],
  }),
);

registerRoute(
  /https:\/\/fonts.(?:googleapis|gstatic).com\//,
  new CacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
      }),
    ],
  }),
);

registerRoute(
  /https:\/\/use.fontawesome.com\/b070c8f1df.css/,
  new CacheFirst({
    cacheName: 'fontawesome-fonts-stylesheets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

cleanupOutdatedCaches();
self.skipWaiting();
