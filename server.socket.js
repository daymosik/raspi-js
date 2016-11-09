import { motorsFn, servoFn } from './johny/motor';

const server = require('http').createServer();
let io = require('socket.io');

server.listen(8080);
io = io.listen(server);

io.on('connection', client => {

  client.on('event', data => {});
  client.on('disconnect', () => console.log('Client disconnected.'));

  // Johny
  client.on('command.moveMotor', data => motorsFn[data.command]());
  client.on('command.moveServo', data => servoFn[data.command]());

  console.log('Client connected.');
});

export default io;