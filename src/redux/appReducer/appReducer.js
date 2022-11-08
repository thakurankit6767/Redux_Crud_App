import {
  ADD_TASKS_FAILURE,
  ADD_TASKS_REQUEST,
  ADD_TASKS_SUCCESS,
  DELETE_TASKS_FAILURE,
  DELETE_TASKS_REQUEST,
  DELETE_TASKS_SUCCESS,
  GET_TASK_FAILURE,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  UPDATE_TASKS_FAILURE,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_SUCCESS,
} from "./appActionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  tasks: [],
};

export const appReducer = (state = initialState, { type, payload, action }) => {
  switch (type) {
    case GET_TASK_REQUEST: {
      return { ...state, isLoading: true };
    }
    case GET_TASK_SUCCESS: {
      return { ...state, isLoading: false, tasks: payload };
    }
    case GET_TASK_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }

    case ADD_TASKS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case ADD_TASKS_SUCCESS: {
      let newArray = [...state.tasks, payload];
      return {
        ...state,
        tasks: newArray,
        isLoading: false,
        isError: false,
      };
    }
    case ADD_TASKS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case UPDATE_TASKS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case UPDATE_TASKS_SUCCESS: {
      let newArray = [...state.tasks, payload];
      return {
        ...state,
        tasks: newArray,
        isLoading: false,
        isError: false,
      };
    }
    case UPDATE_TASKS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case DELETE_TASKS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case DELETE_TASKS_SUCCESS: {
      let newArray = state.tasks.filter((elem) => elem.id !== payload);

      return {
        ...state,
        tasks: newArray,
        isLoading: false,
        isError: false,
      };
    }
    case DELETE_TASKS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    default:
      return state;
  }
};
