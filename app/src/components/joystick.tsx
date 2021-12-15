import { RefObject } from 'react'
import * as React from 'react'
import * as $ from 'jquery'
import * as Hammer from 'hammerjs'
import { JoystickCoords } from '../models/motors'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createjs = require('createjs')

export interface JoystickProps {
  onMove?: (coords: JoystickCoords) => void
  onStart?: () => void
  onEnd?: () => void
}

export interface JoystickState {
  coordX: number
  coordY: number
}

export default class Joystick extends React.Component<JoystickProps, JoystickState> {
  private readonly myRef: RefObject<HTMLCanvasElement>

  constructor(props: JoystickProps) {
    super(props)

    this.state = {
      coordX: 0,
      coordY: 0,
    }

    this.myRef = React.createRef()
  }

  public componentDidMount(): void {
    this.init()
  }

  public render(): JSX.Element {
    return (
      <div className="container">
        <div className="center-align">
          <canvas style={styles.joystick} ref={this.myRef} id="joystick" height="300" width="300" />
        </div>
      </div>
    )
  }

  public init = (): void => {
    let xCenter = 150
    let yCenter = 150
    const stage = new createjs.Stage('joystick')

    const psp = new createjs.Shape()

    psp.graphics.beginFill('#333333').drawCircle(xCenter, yCenter, 50)

    psp.alpha = 0.25

    const vertical = new createjs.Shape()
    const horizontal = new createjs.Shape()
    vertical.graphics.beginFill('#ff4d4d').drawRect(150, 0, 2, 300)
    horizontal.graphics.beginFill('#ff4d4d').drawRect(0, 150, 300, 2)

    stage.addChild(psp)
    stage.addChild(vertical)
    stage.addChild(horizontal)
    createjs.Ticker.framerate = 60
    createjs.Ticker.addEventListener('tick', stage)
    stage.update()

    const myElement: HTMLElement = $('#joystick')[0]
    // const myElement = $(this.myRef)[0]

    // create a simple instance
    // by default, it only adds horizontal recognizers
    const mc = new Hammer(myElement)

    mc.on('panstart', () => {
      xCenter = psp.x
      yCenter = psp.y
      psp.alpha = 0.5

      stage.update()

      this.props.onStart && this.props.onStart()
    })

    mc.on('panmove', (ev) => {
      // const pos = $('#joystick').position()
      // const x = ev.center.x - pos.left - 150
      // const y = ev.center.y - pos.top - 150
      // this.setState({
      //   coordX: x,
      //   coordY: y,
      // })

      const coords = this.calculateCoords(ev.angle, ev.distance)

      this.setState({
        coordX: coords.x,
        coordY: coords.y,
      })

      psp.x = coords.x
      psp.y = coords.y

      psp.alpha = 0.5

      stage.update()

      this.props.onMove && this.props.onMove(coords)
    })

    mc.on('panend', () => {
      psp.alpha = 0.25
      createjs.Tween.get(psp).to({ x: xCenter, y: yCenter }, 750, createjs.Ease.elasticOut)

      this.props.onEnd && this.props.onEnd()
    })
  }

  public calculateCoords = (angle: number, distance: number): JoystickCoords => {
    distance = Math.min(distance, 100)
    const rads = (angle * Math.PI) / 180.0

    return {
      x: distance * Math.cos(rads),
      y: distance * Math.sin(rads),
    }
  }
}

const styles = {
  joystick: {
    height: '300px',
    width: '300px',
    borderRadius: '300px',
    textAlign: 'center' as const,
    backgroundColor: '#80d5ff',
    // font: 24px/300px Helvetica, Arial, sans-serif,
    cursor: 'all-scroll',
    userSelect: 'none' as const,
    zIndex: '-100',
    opacity: '0.5',
  },

  noselect: {
    // -webkit-touch-callout: none;
    // -webkit-user-select: none;
    // -khtml-user-select: none;
    // -moz-user-select: none;
    // -ms-user-select: none;
    userSelect: 'none',
  },
}
