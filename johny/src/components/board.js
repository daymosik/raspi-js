import five from 'johnny-five';

const ports = [
  { id: 'A', port: '/dev/ttyUSB0' },
  { id: 'B', port: '/dev/ttyACM0' }
];

// const ports = ['A', 'B'];

const boardsFn = {
  boards: new five.Boards(ports),
  mega: undefined,
  uno: undefined
};

boardsFn.boards.on('ready', function() {

  boardsFn.mega = this[0];
  boardsFn.uno = this[1];

});

export default boardsFn;
