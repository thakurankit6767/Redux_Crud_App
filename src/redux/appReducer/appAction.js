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
import axios from "axios";

export const getTasks = () => (dispatch) => {
  dispatch({ type: GET_TASK_REQUEST });
  return axios
    .get(`https://pleasant-wasp-robe.cyclic.app`)
    .then((r) => dispatch({ type: GET_TASK_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: GET_TASK_FAILURE, payload: e }));
};

export const updateTasks = (id, payload) => (dispatch) => {
  dispatch({ type: UPDATE_TASKS_REQUEST });
  return axios
    .put(`https://pleasant-wasp-robe.cyclic.app/${id}`, payload)
    .then((r) => dispatch({ type: UPDATE_TASKS_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: UPDATE_TASKS_FAILURE, payload: e }));
};

export const addNewTask = (payload) => (dispatch) => {
  dispatch({ type: ADD_TASKS_REQUEST });
  return axios
    .post(`https://pleasant-wasp-robe.cyclic.app/add`, payload)
    .then((r) => dispatch({ type: ADD_TASKS_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: ADD_TASKS_FAILURE, payload: e }));
};

export const deleteTask = (id) => (dispatch) => {
  dispatch({ type: DELETE_TASKS_REQUEST });
  return axios
    .delete(`https://pleasant-wasp-robe.cyclic.app/${id}`)
    .then((r) => dispatch({ type: DELETE_TASKS_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: DELETE_TASKS_FAILURE, payload: e }));
};

