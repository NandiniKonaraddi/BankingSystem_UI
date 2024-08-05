import { combineReducers, applyMiddleware, createStore } from 'redux';
import budgetReducer from './budgetReducer';
import { thunk } from 'redux-thunk';
const rootReducer = combineReducers({
  budget: budgetReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
