import { BoardsFn } from '@raspi'
// import io from '@socket'
import * as five from 'johnny-five'

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

export class Sensor {
  public leftSensor: five.Proximity
  public rightSensor: five.Proximity

  constructor(boardsFn: BoardsFn) {
    this.leftSensor = new five.Proximity({
      controller: 'HCSR04',
      pin: SENSORS.left.pin,
      board: boardsFn.uno,
    })

    this.rightSensor = new five.Proximity({
      controller: 'HCSR04',
      pin: SENSORS.right.pin,
      board: boardsFn.uno,
    })

    // if (sensorFn.leftSensor) {
      // sensorFn.leftSensor.on('data', function() {
      //   io.emit('leftSensor.data', { cm: parseInt(this.cm, 10) })
      // })
    // }

    // if (sensorFn.rightSensor) {
      // sensorFn.rightSensor.on('data', function() {
      //   io.emit('rightSensor.data', { cm: parseInt(this.cm, 10) })
      // })
    // }
  }
}
