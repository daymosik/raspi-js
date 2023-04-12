import * as React from 'react'
import YamahaRemote from '@components/yamaha-remote'

export const RemotesView = (): JSX.Element => (
  <div className="row">
    <div className="col-md-6">
      <div className="card bg-light mb-4" style={{ borderRadius: '1rem' }}>
        <div className="card-header bg-dark text-light" style={{ borderRadius: '1rem 1rem 0 0' }}>
          Yamaha remote
        </div>
        <div className="card-body p-3">
          <YamahaRemote />
        </div>
      </div>
    </div>
  </div>
)
