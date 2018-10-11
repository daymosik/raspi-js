import socket from '@services/socket'
import * as React from 'react'
import { CirclePicker } from 'react-color'

export default class RGB extends React.Component {
  public render() {
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

  public handleChangeComplete = (color) => {
    socket.emit('command.changeRGBColor', {
      color: color.hex,
    })
  }
}
