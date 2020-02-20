const initialState = {
  byId: {},
  allIds: [],
  flat: []
};

export function jobReducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'JOB_STATUS': {
      return {
        ...state,
      }
    }
    case 'GET_JOBS_REQUESTED': {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        isLoadError: false
      }
    }
    case 'GET_JOBS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isLoadError: false
      }
    }
    case 'GET_JOBS_REJECTED': {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isLoadError: true,
        error: error
      }
    }
    default:
      return state;
  }
}
