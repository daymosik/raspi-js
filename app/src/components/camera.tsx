import * as React from 'react'

const Camera = (): JSX.Element => {
  return (
    <div className="row">
      <div className="col text-center">
        <img src="https://raspi-js.ddns.net:8082/" id="stream" style={styles.img} alt="" />
      </div>
    </div>
  )
}

const styles = {
  img: {
    width: '100%',
    height: '100%',
    marginBottom: '20px',
  },
}

export default Camera
