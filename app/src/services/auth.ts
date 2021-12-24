import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseAppAuth } from '../app'

export enum authType {
  Login = 'login',
  Register = 'register',
}

class Auth {
  public isAuthenticated

  public authenticate = async (email: string, password: string): Promise<unknown> => {
    const data = await signInWithEmailAndPassword(firebaseAppAuth, email, password)
    this.isAuthenticated = true
    return data.user
  }

  public logout = async (): Promise<void> => {
    await signOut(firebaseAppAuth)
    this.isAuthenticated = false
    window.location.reload()
  }

  // public authenticate = async (email: string, password: string, type: authType): Promise<any> => {
  //   const data = type === authType.Login
  //     ? await firebase.auth().signInWithEmailAndPassword(email, password)
  //     : await firebase.auth().createUserWithEmailAndPassword(email, password)
  //   return data.user
  // }
}

const AuthService = new Auth()

export default AuthService
