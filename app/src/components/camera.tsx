import * as React from 'react'

export default class Camera extends React.Component<{}, {}> {
  public render() {
    const styles = {
      img: {
        width: '640px',
        height: '480px',
        marginBottom: '20px',
      },
    }

    return (
      <div className="row">
        <div className="col text-center">
          <img src="http://raspi-js.ddns.net:8081/" id="stream" style={styles.img}/>
        </div>
      </div>
    )
  }
}
