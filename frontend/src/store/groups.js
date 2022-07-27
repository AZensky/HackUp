import { csrfFetch } from "./csrf";

const LOAD_GROUPS = "/groups/LOAD_GROUPS";
const ADD_GROUP = "/groups/ADD_GROUP";
const EDIT_GROUP = "/groups/EDIT_GROUP";
const DELETE_GROUP = "/groups/DELETE_GROUP";

//action creator to load all groups
export const loadGroups = (groups) => {
  return {
    type: LOAD_GROUPS,
    payload: groups,
  };
};

//action creator to create a group
export const addGroup = (info) => {
  return {
    type: ADD_GROUP,
    payload: info,
  };
};

//action creator to edit a group
export const edit = (info) => {
  return {
    type: EDIT_GROUP,
    payload: info,
  };
};

//action creator to delete a group
export const remove = (id) => {
  return {
    type: DELETE_GROUP,
    payload: id,
  };
};

//thunk action creator to load groups
export const getAllGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadGroups(data));
  }
};

//thunk action creator to create a group
export const createGroup = (info) => async (dispatch) => {
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addGroup(data));
    return data;
  }
};

//thunk action creator to edit a group
export const editGroup = (id, info) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(edit(data));
    return data;
  }
};

//thunk action creator to delete a group
export const deleteGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(remove(id));
    return data;
  }
};

const initialState = {};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const allGroups = {};
      action.payload.Groups.forEach((group) => {
        allGroups[group.id] = group;
      });
      return {
        ...allGroups,
      };
    }

    case ADD_GROUP: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case EDIT_GROUP: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_GROUP: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default groupsReducer;
