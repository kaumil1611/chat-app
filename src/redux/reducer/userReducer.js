import { ActionTypes } from "../constants";

const initialState = {
  user: null,
  loading: false,
};

const { SET_USER, LOADING_TOGGLE_ACTION } = ActionTypes;

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };

    case LOADING_TOGGLE_ACTION:
      return { ...state, loading: payload };

    default:
      return state;
  }
};
