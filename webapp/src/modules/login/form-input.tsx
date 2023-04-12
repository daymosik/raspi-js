import { LoginViewStateKeys } from '@modules/login'
import * as React from 'react'

export interface FormInputProps {
  name: LoginViewStateKeys
  value: string
  type: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = (props: FormInputProps): JSX.Element => (
  <input
    className="form-control"
    type={props.type}
    name={props.name}
    value={props.value}
    onChange={props.handleInputChange}
  />
)
