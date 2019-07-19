export default class Auth {
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static authNotified() {
    localStorage.setItem('authNotified', true);
  }

  static getAuthNotified() {
    localStorage.getItem('authNotified');
  }

  static storeReferer(path) {
    localStorage.setItem('referer', path);
  }

  static getReferer() {
    localStorage.getItem('referer');
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    localStorage.getItem('token');
  }
}
