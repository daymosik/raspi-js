import Arrows from '@components/arrows'
import Distance from '@components/distance'
import * as React from 'react'

export const ArrowsView = (): JSX.Element => (
  <div className="row">
    <div className="col-md-6">
      <div className="card bg-dark mb-4" style={{ borderRadius: '1rem' }}>
        <div className="card-body p-3">
          <Distance />
        </div>
      </div>
      <div className="card bg-dark mb-4" style={{ borderRadius: '1rem' }}>
        <div className="card-body p-3">
          <Arrows />
        </div>
      </div>
    </div>
  </div>
)
