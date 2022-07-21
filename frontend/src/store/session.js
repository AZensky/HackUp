import { csrfFetch } from "./csrf";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

//action creator to set the session user
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

//action creator to remove the session user
export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//thunk action creator to call the api to login and then set the session user
export const thunkSetUser = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return data;
  }
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const newState = { ...state };
      newState.user = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
