import { userActionTypes } from './user.types';

// eslint-disable-next-line import/prefer-default-export
export const setCurrentUser = user => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user
});
