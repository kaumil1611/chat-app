import { ActionTypes } from "../constants";

const initialState = {
  user: null,
};

const { SET_USER } = ActionTypes;

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      console.log(payload);
      return { ...state, user: payload };

    default:
      console.log("dafault run");
      return state;
  }
};
