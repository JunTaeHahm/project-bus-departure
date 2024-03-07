import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import pkg from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import WorkboxPlugin from 'workbox-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';
const __dirname = path.resolve(); // ES모듈에서 __dirname 사용법
const { DefinePlugin } = pkg;

dotenv.config();

console.log('isDevelopment::', isDevelopment);

const config = {
  name: 'busgo',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@layouts': path.resolve(__dirname, './src/layouts/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@apis': path.resolve(__dirname, './src/apis/'),
      '@reducers': path.resolve(__dirname, './src/reducers/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
    },
  },

  devServer: {
    historyApiFallback: true,
    open: true,
    static: { directory: path.resolve(__dirname) },
    devMiddleware: { publicPath: '/' },
    hot: true,
    port: 3000,
  },

  entry: {
    // sw: './src/service-worker', // Service Worker
    app: { import: './src/client', asyncChunks: true },
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['> 1% in KR'], // 지원되는 브라우저 설정, browserlist
                  },
                  debug: true, // 디버깅 옵션
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: [
              ['@emotion', { sourceMap: true }],
              ...(isDevelopment ? [['react-refresh/babel', { skipEnvCheck: true }]] : []),
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  proposals: true,
                },
              ],
            ],
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: [/\.png?$/, /\.gif?$/, /\.ico?$/, /\.jpeg?$/, /\.jpg?$/, /\.svg$/],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/fonts',
          to: 'src/assets/fonts',
        },
        {
          from: 'src/assets/images',
          to: 'src/assets/images',
        },
      ],
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
      DEVELOPMENT: isDevelopment ? 'true' : 'false',
      API_SERVER: isDevelopment ? JSON.stringify(process.env.API_SERVER) : '',
    }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    new HtmlWebpackPlugin({
      title: 'Index',
      filename: 'index.html',
      showErrors: true,
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Offline',
      filename: 'offline.html',
      showErrors: true,
      template: './offline.html',
    }),
  ],
};

/* Development */
if (isDevelopment && config.plugins) {
  config.plugins?.push(new webpack.HotModuleReplacementPlugin());
  config.plugins?.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }));
  config.plugins?.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        useURLPolyfill: true,
      },
    }),
  );
}

/* Production */
if (!isDevelopment && config.plugins) {
  config.plugins?.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins?.push(new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }));
  config.plugins?.push(
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'BUSGO',
      short_name: 'BUSGO',
      description: '기점에서의 버스 출발 시간을 기록하여 시간표로 제작합니다.',
      scope: '/',
      start_url: '.',
      display: 'fullscreen',
      orientation: 'portrait',
      categories: ['personalization'],
      crossorigin: 'use-credentials',
      background_color: '#fbfdfc',
      theme_color: '#fbfdfc',
      lang: 'ko',
      dir: 'auto',
      display_override: ['fullscreen'],
      icons: [
        {
          src: 'src/assets/images/favicon.ico',
          sizes: [16, 24, 32, 64],
          type: 'image/x-icon',
        },
        {
          src: 'src/assets/images/logo192.png',
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: 'src/assets/images/logo512.png',
          type: 'image/png',
          sizes: '512x512',
        },
      ],
    }),
  );
  config.plugins?.push(
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/service-worker.js',
      swDest: 'service-worker.js',
    }),
  );
}

export default config;
