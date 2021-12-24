import * as React from 'react'
import { PropsWithChildren } from 'react'

export interface FormGroupProps {
  label: string
}

export const FormGroup = (props: PropsWithChildren<FormGroupProps>): JSX.Element => (
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">{props.label}</label>
    {props.children}
  </div>
)
