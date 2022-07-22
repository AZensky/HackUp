const LOAD_GROUPS = "/groups/LOAD_GROUPS";

//action creator to load all groups
export const loadGroups = (groups) => {
  return {
    type: LOAD_GROUPS,
    payload: groups,
  };
};

export const getAllGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadGroups(data));
  }
};

const initialState = {};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const newState = { ...state };
      newState.groups = action.payload.Groups;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default groupsReducer;
