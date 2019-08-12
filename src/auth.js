import store from './redux/store';
import { setCurrentUser } from './redux/user/user.actions';

class Auth {
  static authenticateUser(remember = true, token) {
    if (!token) {
      token = Auth.getLocalToken() || Auth.getDatabaseToken();
    }

    // BACKENDPLACEHOLDER:
    // Go to db and verify token and ip
    const userDB = {
      name: 'Logged',
      image:
        'https://propertymarketersllc.com/wp-content/uploads/2018/05/profile-picture-placeholder.png'
    };
    // --END--

    store.dispatch(
      setCurrentUser({
        name: userDB.name,
        image: userDB.image
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

  static getLocalToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  static getDatabaseToken() {
    // BACKENDPLACEHOLDER:
    const token = 'asdjashdassd';
    // --END--

    return token;
  }

  static createUser(userInfoFromInput) {
    // BACKENDPLACEHOLDER:
    console.log('User created in DB');
    // --END--

    return true;
  }
}

export default Auth;
