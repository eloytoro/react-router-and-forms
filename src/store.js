import { createStore, combineReducers } from 'redux';
import registerReducer from './reducers/register';
import counterReducer from './reducers/counter';
import loginReducer from './reducers/register';

export default createStore(combineReducers({
  register: registerReducer,
  login: loginReducer,
  counter: counterReducer
}));
