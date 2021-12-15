export interface JoystickCoords {
  x: number
  y: number
}

export type JoystickPrimaryDirection = 'up' | 'down' | 'left' | 'right'

export type JoystickComplexDirection = 'up-right' | 'up-left' | 'down-left' | 'down-right'

export type JoystickDirection = JoystickPrimaryDirection | JoystickComplexDirection
