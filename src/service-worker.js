/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { offlineFallback } from 'workbox-recipes';
import { NavigationRoute, Route, registerRoute, setDefaultHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []); // 없으면 빌드 시 오류(공식문서)

/*===================================================
                오프라인 캐싱 및 SW 설치
===================================================*/
const FALLBACK_CACHE_NAME = 'offline-fallback';
const FALLBACK_HTML = '../offline.html';
const networkWithFallbackStrategy = new NetworkOnly({
  // 오프라인이거나 네트워크 응답이 있기 전에
  // 5초 이상 경과한 경우 캐시된 offline.html로 폴백
  networkTimeoutSeconds: 5,
  plugins: [
    {
      handlerDidError: async () => {
        return await caches.match(FALLBACK_HTML, {
          cacheName: FALLBACK_CACHE_NAME,
        });
      },
    },
  ],
});

setDefaultHandler(new NetworkOnly());
offlineFallback();

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(FALLBACK_CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML)));
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    }),
  );
  console.log('install:: SW 설치 완료');
  console.log('install:: SW 캐시 삭제');
});

/*===================================================
                    여러 항목 캐싱
===================================================*/
// 이미지 캐싱:
const imageRoute = new Route(
  ({ request }) => {
    return request.destination === 'image';
  },
  new StaleWhileRevalidate({
    cacheName: 'images',
  }),
);

// 스크립트 캐싱:
const scriptsRoute = new Route(
  ({ request }) => {
    return request.destination === 'script';
  },
  new CacheFirst({
    cacheName: 'scripts',
  }),
);

// 스타일 캐싱:
const stylesRoute = new Route(
  ({ request }) => {
    return request.destination === 'style';
  },
  new CacheFirst({
    cacheName: 'styles',
  }),
);

// 라우트 등록
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);

/*===================================================
                 불필요한 캐시 항목 제거
===================================================*/
const imageExpRoute = new Route(
  ({ request }) => {
    return request.destination === 'image';
  },
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        // 30일 이상 지난 이미지 캐시 항목 제거
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

const scriptsExpRoute = new Route(
  ({ request }) => {
    return request.destination === 'script';
  },
  new CacheFirst({
    cacheName: 'scripts',
    plugins: [
      new ExpirationPlugin({
        // 캐시에 50개 이상의 항목이 있는 경우
        // 가장 적게 사용되는 스크립트 캐시 항목을 제거
        maxEntries: 50,
      }),
    ],
  }),
);

// 라우트 등록
registerRoute(imageExpRoute);
registerRoute(scriptsExpRoute);

/*===================================================
              사전 캐싱 없이 Workbox 사용
===================================================*/
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: 'navigations',
  }),
);
const imageAssetRoute = new Route(
  ({ request }) => {
    return request.destination === 'image';
  },
  new CacheFirst({
    cacheName: 'image-assets',
  }),
);

// 라우터 등록:
registerRoute(navigationRoute);
registerRoute(imageAssetRoute);

// 모든 탐색을 처리할 경로를 등록
registerRoute(new NavigationRoute(networkWithFallbackStrategy));

/*============================================
        새로운 버전의 SW 업데이트 수락 시
============================================*/
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// // SW 버전 관리
// const SW_VERSION = '1.0.0';

// self.addEventListener('message', (event) => {
//   if (event.data.type === 'GET_VERSION') {
//     event.ports[0].postMessage(SW_VERSION);
//   }
// });
