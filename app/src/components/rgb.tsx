import * as React from 'react'
import { CirclePicker } from 'react-color'

import socket from '@services/socket'

export interface ReactPickerColor {
  hsl: string
  hex: string
  rgb: string
  hsv: string
  oldHue: string
  source: string
}

export default class RGB extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    const styles = {
      circlePicker: {
        // marginBottom: '20px'
        // width: '100%',
        // height: '60px'
      },
      row: {
        marginBottom: '20px',
      },
    }

    return (
      <div className="row" style={styles.row}>
        <div className="col">
          <CirclePicker
            width="100%"
            circleSize={41}
            onChangeComplete={this.handleChangeComplete}
            style={styles.circlePicker}
          />
        </div>
      </div>
    )
  }

  public handleChangeComplete = (color: ReactPickerColor): void => {
    socket.emit('command.changeRGBColor', {
      color: color.hex,
    })
  }
}
