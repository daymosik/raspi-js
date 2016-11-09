import motorsFn from './johny/components/motors';
import servoFn from './johny/components/servo';

const server = require('http').createServer();
let io = require('socket.io');

server.listen(8080);
io = io.listen(server);

io.on('connection', client => {

  client.on('event', data => {});
  client.on('disconnect', () => console.log('Client disconnected.'));

  // Johny
  client.on('command.moveMotor', data => motorsFn[data.command](data.speed));
  client.on('command.moveServo', data => servoFn[data.command](data.speed));

  console.log('Client connected.');
});

export default io;