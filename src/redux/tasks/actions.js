export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_ALL_TASKS = 'UPDATE_ALL_TASKS';

export function addTask(task) {
  return ({ firebase }) => ({
    type: ADD_TASK,
    payload: {
      promise: firebase.child('tasks').push({
        title: task,
        completed: false,
        createdAt: Date.now(),
      }),
    },
  });
}

export function updateTask(task) {
  const taskToSave = Object.assign({}, task);
  delete taskToSave.id;
  return ({ firebase }) => ({
    type: UPDATE_TASK,
    payload: {
      promise: firebase.child(`tasks/${task.id}`).set(taskToSave),
    },
  });
}

export function updateAllTasks(tasks) {
  return {
    type: UPDATE_ALL_TASKS,
    tasks,
  };
}
