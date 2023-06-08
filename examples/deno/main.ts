import '@bogeychan/elysia-polyfills/deno/index.js';
import '@sinclair/typebox'; // deno doesn't download peerDependencies. this one is required
import { Elysia } from 'elysia';

import 'chai'; // test dependency
import '@elysiajs/html';
import '@elysiajs/cors';
import '@elysiajs/bearer';
import '@elysiajs/static';
import { cookie } from '@elysiajs/cookie';

// import 'npm:@bogeychan/elysia-polyfills/deno/index.js';
// import 'npm:@sinclair/typebox@0.26.0';
// import { Elysia } from 'npm:elysia@0.4.9';

const key = Deno.readTextFileSync('../../keys/localhost-key.pem');
const cert = Deno.readTextFileSync('../../keys/localhost.pem');

const app = new Elysia()
  .use(cookie())
  .get('/', () => ({ hello: 'Deno👋' }))
  .post('/:world', (ctx) => `Hello ${ctx.params.world}`)
  .get('/api', ({ setCookie }) => {
    setCookie('a', 'b');
    setCookie('c', 'd');

    return { my: 'json' };
  })
  .listen({ key, cert, port: 8443 });

console.log(`Listening on https://localhost:${app.server!.port}`);

