import Arrows from '@components/arrows'
import Camera from '@components/camera'
import Distance from '@components/distance'
import Joystick from '@components/joystick'
import * as React from 'react'

export const ArrowsView = (): JSX.Element => (
  <>
    <Distance />
    <Arrows />
    <Joystick />
    <Camera />
  </>
)
