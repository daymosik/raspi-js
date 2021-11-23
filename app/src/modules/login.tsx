import { NavigationPath } from '@components/navbar'
import AuthService from '@services/auth'
import { PropsWithChildren } from 'react'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface FormInputPasswordProps {
  value: string
  handleInputChange: (event) => void
}

export const FormInputPassword = (props: FormInputPasswordProps): JSX.Element => (
  <FormInput name={'password'} type={'password'} value={props.value} handleInputChange={props.handleInputChange} />
)

export interface FormInputEmailProps {
  value: string
  handleInputChange: (event) => void
}

export const FormInputEmail = (props: FormInputEmailProps): JSX.Element => (
  <FormInput name={'email'} type={'text'} value={props.value} handleInputChange={props.handleInputChange} />
)

export interface FormInputProps {
  name: string
  value: string
  type: string
  // TODO
  handleInputChange: (event) => void
}

const FormInput = (props: FormInputProps): JSX.Element => (
  <input
    className="form-control"
    type={props.type}
    name={props.name}
    value={props.value}
    onChange={(event) => props.handleInputChange({ [props.name]: event.target.value })}
  />
)

export interface FormGroupProps {
  label: string
}

export const FormGroup = (props: PropsWithChildren<FormGroupProps>): JSX.Element => (
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">{props.label}</label>
    {props.children}
  </div>
)

export interface LoginViewState {
  email: string
  password: string
}

export default class LoginView extends React.Component<RouteComponentProps<never>, LoginViewState> {
  public constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  public render() {
    return (
      <div className="container pt-5">
        <div className="text-center">
          <img src={require('../assets/images/logo-vertical.png')} />
        </div>

        <h2>Login</h2>
        <form onSubmit={this.login}>
          {/*{props.errorMessage && <p className="error-message">{props.errorMessage}</p>}*/}
          <FormGroup label={'Email address'}>
            <FormInputEmail value={this.state.email} handleInputChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup label={'Password'}>
            <FormInputPassword value={this.state.password} handleInputChange={this.handleInputChange} />
          </FormGroup>
          <button className="btn btn-primary" type="submit">
            Zaloguj
          </button>
        </form>
      </div>
    )
  }

  public handleInputChange = (obj): void => this.setState({ ...obj })

  public login = async (event) => {
    event.preventDefault()

    await AuthService.authenticate(this.state.email, this.state.password)
    this.props.history.push(NavigationPath.Home)
  }
}
