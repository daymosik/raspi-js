import * as React from 'react'

export const HomeView = (): JSX.Element => (
  <div className="text-center">
    {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
    <img src={require('@assets/images/raspi-logo-4.png')} alt="" height="200" />
  </div>
)
