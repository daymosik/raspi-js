import * as React from 'react'
import speechRecognition from '@functions/speech-recognition'

export default class SpeechRecognitionView extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    return (
      <div className="d-grid gap-2">
        <button className="btn btn-primary" onClick={this.start}>
          Start recognition
        </button>
        <button className="btn btn-secondary" onClick={this.stop}>
          Stop recognition
        </button>
      </div>
    )
  }

  public start = (): void => {
    speechRecognition.start()
  }

  public stop = (): void => {
    speechRecognition.stop()
  }
}
