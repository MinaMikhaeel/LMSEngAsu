import authReducer from './authReducer'
import fetchReducer from './fetchReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: authReducer,
  list: fetchReducer,

});

export default rootReducer
  
  

