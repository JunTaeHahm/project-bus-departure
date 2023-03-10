import React from 'react';

import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const GlobalStyle = () => (
  <Global
    styles={css`
      /*===================================================
                              Reset
      ===================================================*/
      ${emotionNormalize}
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
      }
      input,
      textarea,
      button {
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        color: var(--primary-black);
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
      }
      html,
      body,
      #root {
        overflow: scroll;
        height: 100%;
        font-family: 'LINESeedKR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
          Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: var(--primary-black);
        background-color: var(--background);
        touch-action: manipulation;
        ::-webkit-scrollbar {
          display: none;
        }
      }
      #app {
        height: 100%;
        min-height: 100%;
        margin: 0 auto;
      }
      li {
        list-style: none;
      }
      a {
        text-decoration: none;
        color: var(--primary-black);
      }

      /*===================================================
                              Font
      ===================================================*/
      @font-face {
        font-style: normal;
        font-weight: bold;
        font-family: 'LINESeedKR';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2')
          format('woff2');
      }
      @font-face {
        font-style: normal;
        font-weight: 400;
        font-family: 'LINESeedKR';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Rg.woff2')
          format('woff2');
      }
      @font-face {
        font-style: normal;
        font-weight: 100;
        font-family: 'LINESeedKR';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Th.woff2')
          format('woff2');
      }

      /*===================================================
                             root
      ===================================================*/
      @media screen and (min-width: 1024px) {
        :root {
          font-size: 16px;
        }
      }
      @media screen and (max-width: 1023px) {
        :root {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 767px) {
        :root {
          font-size: 13px;
        }
      }

      :root {
        --primary-black: #222;
        --primary-skyblue: #e0effe;
        --primary-blue: #008bf8;
        --primary-white: #f8f9fa;
        --primary-grey: #c9c9c9;
        --primary-lightgrey: #dedede;
        --background: #fbfdfc;

        --prism-code-1: #7c858d;
        --prism-code-2: #abb2bf;
        --prism-code-3: #e06c75;
        --prism-code-4: #d19a66;
        --prism-code-5: #98c379;
        --prism-code-6: #56b6c2;
        --prism-code-7: #c678dd;
        --prism-code-8: #61afef;
        --prism-code-9: #c678dd;
      }
    `}
  />
);

export default GlobalStyle;
