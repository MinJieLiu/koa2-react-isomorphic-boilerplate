import http from 'http';
import Koa from 'koa';
import middlewareRegister from './middlewareRegister';
import config from '../common/config';

const app = new Koa();
app.env = 'production';
middlewareRegister(app); // reg middleware

const server = http.createServer(app.callback());
server.listen(config.port, () => {
  console.log('App started, bind port %d, CTRL + C to terminate', config.port);
});

export default server;
