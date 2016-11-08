import motorsFn from './johny/motor';

const server = require('http').createServer();
let io = require('socket.io');

server.listen(8080);
io = io.listen(server);

io.on('connection', client => {

  console.log('Client connected.');

  client.on('event', data => {});
  
  client.on('disconnect', () => {
  	console.log('Client disconnected.');
  });

  client.on('command.move', data => {
  	motorsFn[data.command]();
  });
});

export default io;