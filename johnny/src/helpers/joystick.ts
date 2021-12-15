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
    if (coords.x < -MINIMUM_JOYSTICK_MOVEMENT) {
      return 'left'
    } else if (coords.y < -MINIMUM_JOYSTICK_MOVEMENT) {
      return 'up'
    } else if (coords.x > MINIMUM_JOYSTICK_MOVEMENT) {
      return 'right'
    } else if (coords.y > MINIMUM_JOYSTICK_MOVEMENT) {
      return 'down'
    }
    return null
  },
}

export default joystickHelper
