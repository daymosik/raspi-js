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
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card bg-dark text-white"
            //style="border-radius: 1rem;"
          >
            <div className="card-body p-5">
              <div className="text-center">
                <img src={require('../../assets/images/raspi-logo-1.png')} alt="RaspiJS" style={{ width: '100%' }} />
              </div>

              <hr className="my-4" />

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <form onSubmit={this.login}>
                {/*TODO*/}
                {/*{props.errorMessage && <p className="error-message">{props.errorMessage}</p>}*/}
                <div className="mb-3">
                  <FormGroup label={'Email address'}>
                    <FormInputEmail value={this.state.email} handleInputChange={this.handleInputChange} />
                  </FormGroup>
                </div>
                <div className="mb-3">
                  <FormGroup label={'Password'}>
                    <FormInputPassword value={this.state.password} handleInputChange={this.handleInputChange} />
                  </FormGroup>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-lg btn-block" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
