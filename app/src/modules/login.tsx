import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { NavigationPath } from '../app'
import AuthService from '../services/auth'

export interface FormInputPasswordProps {
  value: string,
  handleInputChange: any
}

export const FormInputPassword = (props: FormInputPasswordProps) => (
  <FormInput
    name={'password'}
    type={'password'}
    value={props.value}
    handleInputChange={props.handleInputChange}
  />
)

export interface FormInputEmailProps {
  value: string,
  handleInputChange: any
}

export const FormInputEmail = (props: FormInputEmailProps) => (
  <FormInput
    name={'email'}
    type={'text'}
    value={props.value}
    handleInputChange={props.handleInputChange}
  />
)

export interface FormInputProps {
  name: string,
  value: string
  type: string,
  // TODO
  handleInputChange: any,
}

const FormInput = (props: FormInputProps) => (
  <input
    className="form-control"
    type={props.type}
    name={props.name}
    value={props.value}
    // tslint:disable-next-line jsx-no-lambda
    onChange={(event) => props.handleInputChange({ [props.name]: event.target.value })}
  />
)

export interface FormGroupProps {
  label: string
}

export const FormGroup: React.SFC<FormGroupProps> = (props) => (
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">{props.label}</label>
    {props.children}
  </div>
)

export interface LoginViewState {
  email: string
  password: string
}

export default class LoginView extends React.Component<RouteComponentProps<any>, LoginViewState> {
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
        <h2>Login</h2>
        <form onSubmit={this.login}>
          {/*{props.errorMessage && <p className="error-message">{props.errorMessage}</p>}*/}
          <FormGroup label={'Email address'}>
            <FormInputEmail value={this.state.email} handleInputChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup label={'Password'}>
            <FormInputPassword value={this.state.password} handleInputChange={this.handleInputChange}/>
          </FormGroup>
          <button className="btn btn-primary" type="submit">Zaloguj</button>
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
