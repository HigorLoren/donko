import profilePicPlaceholder from '../../assets/profile_pic_placeholder.png';

const INITIAL_STATE = {
  currentUser: {
    image: profilePicPlaceholder,
    name: 'Username'
  }
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
