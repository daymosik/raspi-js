import * as React from 'react'
import { PropsWithChildren } from 'react'

interface TooltipProps {
  tooltipText: string
  additionalClassName?: string
}

const Tooltip = (props: PropsWithChildren<TooltipProps>): JSX.Element => {
  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={props.tooltipText}
      className={`tooltip__wrapper ${props.additionalClassName || ''}`}
    >
      {props.children}
    </div>
  )
}

export default Tooltip
