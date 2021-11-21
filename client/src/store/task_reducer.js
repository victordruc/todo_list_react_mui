import { tasksApi } from "../serverApi/serverApi";

const REQUEST_ALL_TASKS = "REQUEST_ALL_TASKS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const UPDATE_STATUS = "UPDATE_STATUS";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_IS_FETCHING_PAGE = "TOGGLE_IS_FETCHING_PAGE";
const SORT_TASKS = "SORT_TASKS";
const SEARCH_TASKS = "SEARCH_TASKS";

const initState = {
  task: [],
  isFetching: false,
  isFetchingPage: true,
};

export const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_ALL_TASKS:
      return { ...state, task: action.payload };
    case UPDATE_STATUS:
      const updateStatus = state.task.map((item) =>
        item._id === action.payload._id ? { ...item, status: true } : item
      );
      return { ...state, task: updateStatus };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case ADD_TASK:
      return { ...state, task: [...state.task, action.payload] };
    case UPDATE_TASK:
      const updateTask = state.task.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      return { ...state, task: updateTask };
    case DELETE_TASK:
      const task = state.task.filter((item) => item._id !== action.payload._id);
      return { ...state, task };
    case TOGGLE_IS_FETCHING_PAGE:
      return { ...state, isFetchingPage: action.payload };
    case SORT_TASKS:
      return { ...state, task: action.payload };
    case SEARCH_TASKS:
      return { ...state, task: action.payload };
    default:
      return state;
  }
};

// sync function

const actionRequestAllTasks = (payload) => ({
  type: REQUEST_ALL_TASKS,
  payload,
});

const actionToggleFetching = (payload) => ({
  type: TOGGLE_IS_FETCHING,
  payload,
});

const actionToggleFetchingPage = (payload) => ({
  type: TOGGLE_IS_FETCHING_PAGE,
  payload,
});

const actionUpdateStatus = (payload) => ({
  type: UPDATE_STATUS,
  payload,
});

const actionAddTask = (payload) => ({
  type: ADD_TASK,
  payload,
});

const actionUpdateTask = (payload) => ({
  type: UPDATE_TASK,
  payload,
});

const actionDeleteTask = (payload) => ({
  type: DELETE_TASK,
  payload,
});

const actionSortTasks = (payload) => ({
  type: SORT_TASKS,
  payload,
});

const actionSearchTasks = (payload) => ({
  type: SEARCH_TASKS,
  payload,
});
// async function

export const actionRequestAllTasksAsync = () => (dispatch) => {
  dispatch(actionToggleFetchingPage(true));
  tasksApi
    .getTasks()
    .then((res) => {
      dispatch(actionRequestAllTasks(res));
      dispatch(actionToggleFetchingPage(false));
    })
};

export const actionUpdateStatusAsync = (id) => (dispatch) => {
  dispatch(actionToggleFetching(true));
  tasksApi.updateStatus(id).then((res) => {
    dispatch(actionUpdateStatus(res));
    dispatch(actionToggleFetching(false));
  });
};

export const actionAddTaskAsync = (body) => (dispatch) => {
  dispatch(actionToggleFetching(true));
  tasksApi.addTask(body).then((res) => {
    dispatch(actionAddTask(res));
    dispatch(actionToggleFetching(false));
  });
};

export const actionUpdateTaskAsync = (id, body) => (dispatch) => {
  dispatch(actionToggleFetching(true));
  tasksApi.updateTask(id, body).then((res) => {
    dispatch(actionUpdateTask(res));
    dispatch(actionToggleFetching(false));
  });
};

export const actionDeleteTaskAsync = (id) => (dispatch) => {
  dispatch(actionToggleFetching(true));
  tasksApi.deleteTask(id).then((res) => {
    dispatch(actionDeleteTask(res));
    dispatch(actionToggleFetching(false));
  });
};

export const actionSortTasksAsync = (type) => (dispatch) => {
  dispatch(actionToggleFetchingPage(true));
  tasksApi
    .sortTasks(type)
    .then((res) => {
      dispatch(actionSortTasks(res));
      dispatch(actionToggleFetchingPage(false));
    })
};

export const actionSearchTasksAsync = (string) => (dispatch) => {
  dispatch(actionToggleFetchingPage(true));
  tasksApi
    .searchTasks(string)
    .then((res) => {
      dispatch(actionSearchTasks(res));
      dispatch(actionToggleFetchingPage(false));
    })
};