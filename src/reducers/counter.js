const initialState = 0;

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ADD': return state +1; 
    case 'REMOVE': {
    	if (state >= 1) return state-1;
    	else return 0;
    }
    
    default: return state;
  }
};