const TOGGLE_APP_ERROR = "TOGGLE_APP_ERROR"

const initState = {
    error:false
}

export const appReducer = (state = initState, action) => {
    switch (action.type) {
      case TOGGLE_APP_ERROR:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

export const actionToggleAppError = (payload) => ({type:TOGGLE_APP_ERROR, payload})