import * as React from 'react'
import { PropsWithChildren } from 'react'

export interface ComponentCardViewComponentProps {
  name: string
  icon: string
}

export type ComponentCardViewProps = PropsWithChildren<ComponentCardViewComponentProps>

export const ComponentCardView = (props: ComponentCardViewProps): JSX.Element => (
  <div className="card bg-light mb-4 border-0" style={{ borderRadius: '1rem' }}>
    <div className="card-header bg-dark text-light" style={{ borderRadius: '1rem 1rem 0 0' }}>
      <i className={props.icon}></i> {props.name}
    </div>
    <div className="card-body p-3">{props.children}</div>
  </div>
)
