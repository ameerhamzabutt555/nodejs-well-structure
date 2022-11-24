const http = require('http');
const normalizePort = require('normalize-port');
const app = require('../app');
const { PORT } = require('../utils/config');

const port = normalizePort(PORT || '3007');
/**
 * create HTTP server
 */
const server = http.createServer(app);
server.listen(port);

function onError(error) {
  console.log('Server error', error);
}

function onListening() {
  const addr = server.address();
  console.log(`Server listening on port ${addr.port}`);
}

server.on('error', onError);
server.on('listening', onListening);
