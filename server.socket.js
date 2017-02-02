import motorsFn from './johny/components/motors';
// import servoFn from './johny/components/servo';
// import Exploration from './johny/functions/exploration';
// import exploration from './johny/raspi.js';
import ledRGBFn from './johny/components/led-rgb'
import Speech from './johny/functions/speech';
import Player from './johny/functions/play';

const server = require('http').createServer();
let io = require('socket.io');
const speach = new Speech();
const player = new Player();

server.listen(8090);
io = io.listen(server);

io.on('connection', client => {

  client.on('event', data => {});
  client.on('disconnect', () => console.log('Client disconnected.'));

  // Johny
  client.on('command.moveMotor', data => motorsFn[data.command](data.speed));
  // client.on('command.moveServo', data => servoFn[data.command](data.speed));
  client.on('command.changeRGBColor', data => ledRGBFn.changeRGBColor(data.color));
  client.on('command.turnOffRGB', () => ledRGBFn.ledRGB.off());

  client.on('command.speak', data => speach.speak(data.text));
  client.on('command.playRandomSound', () => player.playRandomSound());

  console.log('Client connected.');
});

export default io;
