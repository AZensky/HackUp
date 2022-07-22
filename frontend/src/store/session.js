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
export const login = (user) => async (dispatch) => {
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

//restore session user thunk, so when a logged in user tries to log in, they get redirected
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//signup user thunk action creator, will hit signup backend route, with email and password
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  // After the response comes back, we parse the JSON body, and dispatch the action for setting the session user
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// thunk action creator to handle logging out the user
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const newState = { ...state };
      newState.user = action.payload;
      return newState;
    }

    case REMOVE_USER: {
      let newState = { ...state };
      newState.user = null;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
