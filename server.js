const {createServer} = require('http');
const {parse} = require('url'); /* eslint-disable-line node/no-deprecated-api */
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

// Needed to do this: https://stackoverflow.com/questions/22875270/error-installing-bcrypt-with-pip-on-os-x-cant-find-ffi-h-libffi-is-installed/25854749#25854749