import store from './redux/store';
import { setCurrentUser } from './redux/user/user.actions';
import defaultProfilePic from './assets/profile_pic_placeholder.png';

class Auth {
  static authenticateUser(remember = true, token) {
    if (!token) {
      token = Auth.getLocalToken() || Auth.createNewToken();
    }

    // BACKENDPLACEHOLDER:
    // Go to db and verify token and ip
    const userDB = {
      name: 'Username',
      image: defaultProfilePic,
    };
    // --END--

    store.dispatch(
      setCurrentUser({
        name: userDB.name,
        image: userDB.image,
      })
    );

    remember ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);

    return true;
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

  static createNewToken() {
    // BACKENDPLACEHOLDER:
    const token = 'asdjashdassd';
    // --END--

    return token;
  }

  static createUser(userInfoFromInput) {
    // BACKENDPLACEHOLDER:
    console.log('User created in DB and new token generated');
    const token = 'asdjashdassd';
    // --END--

    return token;
  }
}

export default Auth;
