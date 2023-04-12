import Buzzer from '@components/buzzer'
import Player from '@components/player'
import RGB from '@components/rgb'
import SevenSegmentLedView from '@components/seven-segment-led'
import Speech from '@components/speech'
import * as React from 'react'
import { ComponentCardView } from '@components/component-card'
import SpeechRecognitionView from '@components/speech-recognition'
import ChatView from '@components/chat'
import LCDView from '@components/lcd'

export const ComponentsView = (): JSX.Element => (
  <div className="row">
    <div className="col-sm-6">
      <ComponentCardView name="Chat" icon="fa-regular fa-lightbulb">
        <ChatView />
      </ComponentCardView>
    </div>
    <div className="col-sm-6">
      <ComponentCardView name="Speech" icon="fa-solid fa-play">
        <Speech />
      </ComponentCardView>
      <ComponentCardView name="Speech recognition" icon="fa-solid fa-play">
        <SpeechRecognitionView />
      </ComponentCardView>
    </div>
    <div className="col-sm-6">
      <ComponentCardView name="LED RGB" icon="fa-regular fa-lightbulb">
        <RGB />
      </ComponentCardView>
    </div>
    <div className="col-sm-6">
      <ComponentCardView name="LCD" icon="fa-regular fa-lightbulb">
        <LCDView />
      </ComponentCardView>
    </div>
    <div className="col">
      <ComponentCardView name="Player" icon="fa-solid fa-file-audio">
        <Player />
      </ComponentCardView>
    </div>
    <div className="col">
      <ComponentCardView name="Buzzer" icon="fa-regular fa-lightbulb">
        <Buzzer />
      </ComponentCardView>
    </div>
    <div className="col">
      <ComponentCardView name="Seven segment led" icon="fa-regular fa-lightbulb">
        <SevenSegmentLedView />
      </ComponentCardView>
    </div>
  </div>
)
