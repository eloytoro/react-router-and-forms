const initialState = {};

const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_VALUE_REGISTER': return {
      ...state,
      [action.name]: action.value
    }
    default: return state;
  }
};

export default registerReducer;
