import { RefObject } from 'react'
import * as React from 'react'
import Hammer from 'hammerjs'
import { JoystickCoords } from '@models/motors'
import * as createjs from 'createjs-module'
import { Shape, Stage } from 'createjs-module'

export interface JoystickProps {
  onMove?: (coords: JoystickCoords) => void
  onStart?: () => void
  onEnd?: () => void
}

export interface JoystickState {
  coordX: number
  coordY: number
  xCenter: number
  yCenter: number
}

export default class Joystick extends React.Component<JoystickProps, JoystickState> {
  private readonly myRef: RefObject<HTMLCanvasElement>
  private hammerManager: HammerManager

  private stage: Stage
  private shape: Shape

  constructor(props: JoystickProps) {
    super(props)

    this.state = {
      coordX: 0,
      coordY: 0,
      xCenter: 150,
      yCenter: 150,
    }

    this.myRef = React.createRef()
  }

  public componentDidMount(): void {
    this.init()
  }

  public componentWillUnmount(): void {
    this.unsubscribeEvents()

    if (this.hammerManager) {
      this.hammerManager.destroy()
    }
  }

  public render(): JSX.Element {
    return (
      <div className="container noselect">
        <div className="center-align">
          <canvas style={styles.joystick} ref={this.myRef} id="joystick" height="300" width="300" />
        </div>
      </div>
    )
  }

  public init = (): void => {
    this.stage = new createjs.Stage('joystick')
    this.shape = new createjs.Shape()

    this.shape.graphics.beginFill('#333333').drawCircle(this.state.xCenter, this.state.yCenter, 50)

    this.shape.alpha = 0.25

    const vertical = new createjs.Shape()
    const horizontal = new createjs.Shape()
    vertical.graphics.beginFill('#ff4d4d').drawRect(150, 0, 2, 300)
    horizontal.graphics.beginFill('#ff4d4d').drawRect(0, 150, 300, 2)

    this.stage.addChild(this.shape)
    this.stage.addChild(vertical)
    this.stage.addChild(horizontal)

    createjs.Ticker.framerate = 60
    createjs.Ticker.addEventListener('tick', this.stage)

    this.stage.update()

    // create a simple instance
    // by default, it only adds horizontal recognizers
    const myElement = this.myRef.current
    if (myElement) {
      this.hammerManager = new Hammer(myElement)
    }

    this.subscribeEvents()
  }

  public subscribeEvents = (): void => {
    this.hammerManager.on('panstart', () => {
      this.setState({
        xCenter: this.shape.x,
        yCenter: this.shape.y,
      })

      this.shape.alpha = 0.5

      this.stage.update()

      this.props.onStart && this.props.onStart()
    })

    this.hammerManager.on('panmove', (ev) => {
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

      this.shape.x = coords.x
      this.shape.y = coords.y

      this.shape.alpha = 0.5

      this.stage.update()

      this.props.onMove && this.props.onMove(coords)
    })

    this.hammerManager.on('panend', () => {
      this.shape.alpha = 0.25
      createjs.Tween.get(this.shape).to({ x: this.state.xCenter, y: this.state.yCenter }, 750, createjs.Ease.elasticOut)

      this.props.onEnd && this.props.onEnd()
    })
  }

  private unsubscribeEvents = (): void => {
    if (this.hammerManager) {
      this.hammerManager.off('panend')
      this.hammerManager.off('panmove')
      this.hammerManager.off('panstart')
    }
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
    userSelect: 'none' as const,
  },
}
