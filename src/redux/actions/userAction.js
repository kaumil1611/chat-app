import { ActionTypes } from "../constants";
const { SET_USER } = ActionTypes;

export const setUsers = (users) => {
  return {
    type: SET_USER,
    payload: users,
  };
};
