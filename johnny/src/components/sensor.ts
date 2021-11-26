import * as five from 'johnny-five'

import { app, BoardsFn } from '@raspi'

const SENSORS = {
  left: {
    pin: 3,
  },
  right: {
    pin: 11,
  },
}

// const SENSOR_PIN = 3
// const BOTTOM_SENSOR_PIN = 2

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

    if (this.leftSensor) {
      this.leftSensor.on('data', function () {
        app.io.emit('leftSensor.data', { cm: parseInt(this.cm, 10) })
      })
    }

    if (this.rightSensor) {
      this.rightSensor.on('data', function () {
        app.io.emit('rightSensor.data', { cm: parseInt(this.cm, 10) })
      })
    }
  }
}
