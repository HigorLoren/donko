import store from './redux/store';
import { setCurrentUser } from './redux/user/user.actions';

class Auth {
  static authenticateUser(token, remember) {
    // BACKENDPLACEHOLDER:
    // Go to db and verify token and ip
    const currentUserImage =
      'https://propertymarketersllc.com/wp-content/uploads/2018/05/profile-picture-placeholder.png';
    const currentUserName = 'Logged';
    // --END--

    store.dispatch(
      setCurrentUser({
        name: currentUserName,
        image: currentUserImage
      })
    );
    remember ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    return (
      store.getState().user.currentUser.name !== null &&
      (localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null)
    );
  }

  static userHasToken() {
    return localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    store.dispatch(setCurrentUser({ name: null, image: null }));
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
}

export default Auth;
