import * as actions from './actions';

const initialState = {
  isConnected: true,
};

export default function netInfoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_IS_CONNECTED: {
      const { isConnected } = action;
      return { ...state, isConnected };
    }

    default:
      return state;
  }
}
