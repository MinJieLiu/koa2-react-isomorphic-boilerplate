import http from 'http';
import Koa from 'koa';
import debugFunc from 'debug';
import middlewareRegister from './middlewareRegister';
import config from '../common/config';

const debug = debugFunc('app:bin:server');

const app = new Koa();
middlewareRegister(app); // reg middleware

const server = http.createServer(app.callback());
server.listen(config.port, () => {
  debug('App started, bind port %d, CTRL + C to terminate', config.port);
});

export default server;
