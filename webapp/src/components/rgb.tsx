import * as React from 'react'

import socket from '@services/socket'
import Circle from '@uiw/react-color-circle'
import { ColorResult } from '@uiw/color-convert'

const colors = [
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
]

export default class RGB extends React.Component<unknown, unknown> {
  public render(): React.ReactElement {
    return (
      <Circle colors={colors} onChange={this.handleChangeComplete} pointProps={{ style: { width: 40, height: 40 } }} />
    )
  }

  public handleChangeComplete = (color: ColorResult): void => {
    socket.emit('command.changeRGBColor', {
      color: color.hex,
    })
  }
}
