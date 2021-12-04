import * as React from 'react'

export default class Camera extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
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
          {/*<img src="http://raspi-js.ddns.net:8081/" id="stream" style={styles.img} alt="" />*/}
          <img src="https://images.weserv.nl/?url=raspi-js.ddns.net:8081" id="stream" style={styles.img} alt="" />
        </div>
      </div>
    )
  }
}
