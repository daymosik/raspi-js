import motorsFn from './johny/components/motors';
import servoFn from './johny/components/servo';
// import Exploration from './johny/functions/exploration';
import exploration from './johny/raspi.js';
import ledRGBFn from './johny/components/led-rgb'

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
  client.on('command.changeRGBColor', data => ledRGBFn.changeRGBColor(data.color));

  console.log('Client connected.');
});

export default io;