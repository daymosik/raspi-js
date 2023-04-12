import * as React from 'react'
import { CirclePicker, ColorResult } from 'react-color'

import socket from '@services/socket'

export default class RGB extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    return <CirclePicker width="100%" circleSize={41} onChangeComplete={this.handleChangeComplete} />
  }

  public handleChangeComplete = (color: ColorResult): void => {
    socket.emit('command.changeRGBColor', {
      color: color.hex,
    })
  }
}
