import * as five from 'johnny-five'
import io from '../server.socket'
import boardsFn from './board'

const SENSORS = {
  left: {
    pin: 3,
  },
  right: {
    pin: 2,
  },
}

const SENSOR_PIN = 3
const BOTTOM_SENSOR_PIN = 2

export interface SensorFn {
  leftSensor: five.Proximity | undefined
  rightSensor: five.Proximity | undefined
}

const sensorFn: SensorFn = {
  leftSensor: undefined,
  rightSensor: undefined,
}

boardsFn.boards.on('ready', () => {

  sensorFn.leftSensor = new five.Proximity({
    controller: 'HCSR04',
    pin: SENSORS.left.pin,
    board: boardsFn.uno,
  })

  sensorFn.rightSensor = new five.Proximity({
    controller: 'HCSR04',
    pin: SENSORS.right.pin,
    board: boardsFn.uno,
  })

  if (sensorFn.leftSensor) {
    sensorFn.leftSensor.on('data', function() {
      io.emit('leftSensor.data', { cm: parseInt(this.cm, 10) })
    })
  }

  if (sensorFn.rightSensor) {
    sensorFn.rightSensor.on('data', function() {
      io.emit('rightSensor.data', { cm: parseInt(this.cm, 10) })
    })
  }

  boardsFn.boards.repl.inject({
    sensorFn,
  })

})

export default sensorFn
