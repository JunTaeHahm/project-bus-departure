import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { Workbox } from 'workbox-window';

import App from './App';
import GlobalStyle from '@styles/global';

const isDevelopment = process.env.NODE_ENV !== 'production';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* Axios 기본 설정 */
axios.defaults.withCredentials = true;
if (isDevelopment) {
  axios.defaults.baseURL = 'http://localhost:8000'; // 개발
} else {
  axios.defaults.baseURL = '배포url'; // 배포
}

/* React-Query 기본 설정 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // window focus 설정
    },
  },
});

// /* PWA */
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     /*===================================================
//                           SW 등록
//       ===================================================*/
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then((registration) => {
//         registration.unregister(); // 기존 SW 해제
//         console.log('register:: SW 등록 성공');
//       })
//       .catch((error) => {
//         console.log('SW 등록 실패, Error:: ', error);
//       });
//     /*===================================================
//                       Work Box 사용
//       ===================================================*/
//     const wb = new Workbox('/sw.js');

//     wb.addEventListener('installed', (event) => {
//       if (!event.isUpdate) {
//         console.log('installed:: Workbox 설치 완료');
//       }
//     });
//     wb.register();

//     // 자동 업데이트
//     wb.messageSkipWaiting();
//   });
// }

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>,
);
