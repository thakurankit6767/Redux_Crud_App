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

    case ADD_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    

  

    case DELETE_TASKS_REQUEST:
      return {
        ...state,
        tasks: state.tasks.map((res) =>
          res.id === payload ? { ...res, loading: true } : res
        ),
        loading: true,
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((res) => res.id !== action.payload),
        loading: false,
      };
    case DELETE_TASKS_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
