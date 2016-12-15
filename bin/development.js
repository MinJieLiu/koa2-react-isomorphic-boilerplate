import http from 'http';
import Koa from 'koa';
import KWM from 'koa-webpack-middleware';
import path from 'path';
import webpack from 'webpack';
import chokidar from 'chokidar';
import 'babel-polyfill';
import debugFunc from 'debug';
import middlewareRegister from '../platforms/server/middlewareRegister';
import webpackConfig from '../config/webpack.development';
import config from '../platforms/common/config';

const debug = debugFunc('app:dev:server');

const app = new Koa();
const devMiddleware = KWM.devMiddleware;
const hotMiddleware = KWM.hotMiddleware;
const compiler = webpack(webpackConfig);

debug('Waiting for webpack ...');

require('babel-core/register')({
  plugins: [
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.less', '.css'],
    }],
    ['inline-replace-variables', {
      __SERVER__: true,
    }],
  ],
});

require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff', 'webp'],
  name: '/build/[name].[ext]',
  limit: 10000,
});

const devMiddlewareInstance = devMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false,
  },
  publicPath: '/build/',
  stats: {
    colors: true,
  },
});

const hotMiddlewareInstance = hotMiddleware(compiler, {
  log: debug,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
});

app.env = 'development';
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);
middlewareRegister(app); // reg middleware
// error logger
app.on('error', (err) => {
  debug('error occured:', err.stack);
});

// listen
const server = http.createServer(app.callback());
const watcher = chokidar.watch([
  path.join(__dirname, '../app'),
  path.join(__dirname, '../platforms'),
]);

watcher.on('ready', () => {
  watcher.on('all', () => {
    debug('Clearing module cache');
    Object.keys(require.cache).forEach((id) => {
      if (/[/\\](app|platforms)[/\\]/.test(id)) delete require.cache[id];
    });
  });
});

let isListened = false;
compiler._plugins['after-compile'].push((compilation, callback) => {
  callback();
  if (!isListened) {
    server.listen(config.port, (err) => {
      if (err) {
        debug(err);
        return;
      }
      debug('App started, at port %d, CTRL + C to terminate', config.port);
      isListened = true;
    });
  }
});
