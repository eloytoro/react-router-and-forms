const initialState = {};

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_VALUE_LOGIN': return {
      ...state,
      [action.name]: action.value
    }
    default: return state;
  }
};

export default loginReducer;
