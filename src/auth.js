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
    return Boolean(
      store.getState().user.currentUser.name &&
        (localStorage.getItem('token') || sessionStorage.getItem('token'))
    );
  }

  static userHasToken() {
    return Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'));
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
