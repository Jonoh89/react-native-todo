import * as actions from './actions';

const initialState = {
  list: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_ALL_TASKS: {
      const { tasks } = action;
      return { ...state, list: tasks };
    }

    default:
      return state;
  }
}
