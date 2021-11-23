import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export enum authType {
  Login = 'login',
  Register = 'register',
}

class Auth {
  public isAuthenticated

  public authenticate = async (email: string, password: string): Promise<any> => {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password)
    this.isAuthenticated = true
    return data.user
  }

  public logout = async () => {
    await firebase.auth().signOut()
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
