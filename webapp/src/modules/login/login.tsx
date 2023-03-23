import { FormGroup } from '@modules/login/form-group'
import { FormInput } from '@modules/login/form-input'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { NavigationPath } from '@components/navbar'
import AuthService from '@services/auth'

export interface FormInputPasswordProps {
  value: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInputPassword = (props: FormInputPasswordProps): JSX.Element => (
  <FormInput name={'password'} type={'password'} value={props.value} handleInputChange={props.handleInputChange} />
)

export interface FormInputEmailProps {
  value: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInputEmail = (props: FormInputEmailProps): JSX.Element => (
  <FormInput name={'email'} type={'text'} value={props.value} handleInputChange={props.handleInputChange} />
)

export interface LoginViewState {
  email: string
  password: string
}

export type LoginViewStateKeys = keyof LoginViewState

export type LoginViewProps = RouteComponentProps<never>

export default class LoginView extends React.Component<LoginViewProps, LoginViewState> {
  public constructor(props: LoginViewProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  public componentDidMount(): void {
    console.log(AuthService.isAuthenticated)
  }

  public render(): JSX.Element {
    return (
      <div className="container pt-5">
        <div className="text-center">
          <img src={require('../../assets/images/logo-vertical.png')} alt="" />
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

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    this.setState({ ...this.state, [event.target.name]: event.target.value })

  public login = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    await AuthService.authenticate(this.state.email, this.state.password)
    this.props.history.push(NavigationPath.Home)
  }
}