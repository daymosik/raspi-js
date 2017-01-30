import motorsFn from './johny/components/motors';
// import servoFn from './johny/components/servo';
// import Exploration from './johny/functions/exploration';
// import exploration from './johny/raspi.js';
import ledRGBFn from './johny/components/led-rgb'
import Speech from './johny/functions/speech';

const server = require('http').createServer();
let io = require('socket.io');
const speach = new Speech();

server.listen(8090);
io = io.listen(server);

io.on('connection', client => {

  client.on('event', data => {});
  client.on('disconnect', () => console.log('Client disconnected.'));

  // Johny
  client.on('command.moveMotor', data => motorsFn[data.command](data.speed));
  // client.on('command.moveServo', data => servoFn[data.command](data.speed));
  client.on('command.changeRGBColor', data => ledRGBFn.changeRGBColor(data.color));
  client.on('command.speak', data => speach.speak(data.text));

  console.log('Client connected.');
});

export default io;
