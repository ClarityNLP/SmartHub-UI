import { combineReducers } from 'redux'
import { jobReducer } from './job_reducer'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  jobs: jobReducer
})
