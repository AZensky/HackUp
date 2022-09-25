import { csrfFetch } from "./csrf";

const LOAD_GROUP_MEMBERS = "/groupMembers/LOAD_GROUP_MEMBERS";
const REQUEST_GROUP_MEMBERSHIP = "/groupMembers/REQUEST_GROUP_MEMBERS";
const ADD_GROUP_MEMBER = "/groupMembers/ADD_GROUP_MEMBER";
const EDIT_GROUP_MEMBER = "/groupMembers/EDIT_GROUP_MEMBER";
const DELETE_GROUP_MEMBER = "/groupMembers/DELETE_GROUP_MEMBER";

const load = (groupMembers) => ({
  type: LOAD_GROUP_MEMBERS,
  payload: groupMembers,
});

const add = (groupMember) => ({
  type: ADD_GROUP_MEMBER,
  payload: groupMember,
});

const edit = (groupMember) => ({
  type: EDIT_GROUP_MEMBER,
  payload: groupMember,
});

const remove = (id) => ({
  type: DELETE_GROUP_MEMBER,
  payload: id,
});

export const getGroupMembers = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}/members`);

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  }
};

export const createGroupMember = (groupId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });
};

export const requestMembership = (groupId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   userId,
    // }),
  });

  //   if (response.ok) {
  //     const data = await response.json();
  //     dispatch(add(data));
  //   }
};

const initialState = {};

export const groupMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUP_MEMBERS: {
      const allGroupMembers = {};
      action.payload.GroupMembers.forEach((groupMember) => {
        allGroupMembers[groupMember.id] = groupMember;
      });
      return {
        ...allGroupMembers,
      };
    }

    case ADD_GROUP_MEMBER: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case EDIT_GROUP_MEMBER: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_GROUP_MEMBER: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default groupMembersReducer;
