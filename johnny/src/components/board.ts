import * as five from 'johnny-five'

const ports = [
  { id: 'A', port: '/dev/ttyUSB0' },
  { id: 'B', port: '/dev/ttyACM0' },
]

// const ports = ['A', 'B'];

export interface BoardsFn {
  boards: five.Board.Collection
  mega: five.Board
  uno: five.Board
}

const boardsFn: BoardsFn = {
  boards: new five.Boards(ports),
  mega: undefined,
  uno: undefined,
}

boardsFn.boards.on('ready', function() {
  boardsFn.mega = this[0]
  boardsFn.uno = this[1]
})

export default boardsFn
