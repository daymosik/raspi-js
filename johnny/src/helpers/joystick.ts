import { JoystickCoords, JoystickDirection } from '../models/motors'

export const MINIMUM_JOYSTICK_MOVEMENT = 10

const joystickHelper = {
  getSpeedFromCoords: (coords: JoystickCoords): number => {
    const direction = joystickHelper.getJoystickDirection(coords)
    let position = 0
    switch (direction) {
      case 'up':
        position = coords.y
        break
      case 'left':
        position = coords.x
        break
      case 'right':
        position = coords.x
        break
      case 'down':
        position = coords.y
        break
    }

    const absPosition = Math.abs(position)
    return absPosition > MINIMUM_JOYSTICK_MOVEMENT ? (180 * absPosition) / 100 : 0
  },

  getJoystickDirection: (coords: JoystickCoords): JoystickDirection | null => {
    const { x, y } = coords

    if (y < -MINIMUM_JOYSTICK_MOVEMENT && x < -MINIMUM_JOYSTICK_MOVEMENT) {
      return 'up-left'
    } else if (y < -MINIMUM_JOYSTICK_MOVEMENT && x > MINIMUM_JOYSTICK_MOVEMENT) {
      return 'up-right'
    } else if (y < -MINIMUM_JOYSTICK_MOVEMENT) {
      return 'up'
    }

    if (y > MINIMUM_JOYSTICK_MOVEMENT && x < -MINIMUM_JOYSTICK_MOVEMENT) {
      return 'down-left'
    } else if (y > MINIMUM_JOYSTICK_MOVEMENT && x > MINIMUM_JOYSTICK_MOVEMENT) {
      return 'down-right'
    } else if (y > MINIMUM_JOYSTICK_MOVEMENT) {
      return 'down'
    }

    if (x < -MINIMUM_JOYSTICK_MOVEMENT) {
      return 'left'
    } else if (y < -MINIMUM_JOYSTICK_MOVEMENT) {
      return 'up'
    } else if (x > MINIMUM_JOYSTICK_MOVEMENT) {
      return 'right'
    } else if (y > MINIMUM_JOYSTICK_MOVEMENT) {
      return 'down'
    }
    return null
  },
}

export default joystickHelper
