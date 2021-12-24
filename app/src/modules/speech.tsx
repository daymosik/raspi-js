import Buzzer from '@components/buzzer'
import Player from '@components/player'
import RGB from '@components/rgb'
import SevenSegmentLedView from '@components/seven-segment-led'
import Speech from '@components/speech'
import * as React from 'react'

export const SpeechView = (): JSX.Element => (
  <div className="container pt-5">
    <div className="row">
      <div className="col">
        <RGB />
      </div>
      <div className="col">
        <Speech />
        <Player />
        <Buzzer />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <SevenSegmentLedView />
      </div>
    </div>
  </div>
)
