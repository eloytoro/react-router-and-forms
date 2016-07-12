const initialState = 0;

const counter = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT': return state +1;
    
    case 'DECREMENT':

    	if(state > 0){
    		return state -1;
    	}else{
    		return state;
    	};
    
    	
    default: return state;
  }
};

export default counter;


