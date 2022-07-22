import { csrfFetch } from "./csrf";

const LOAD_EVENTS = "/groups/LOAD_EVENTS";
const ADD_EVENT = "/groups/ADD_EVENT";
const EDIT_EVENT = "/groups/EDIT_EVENT";
const DELETE_EVENT = "/groups/DELETE_EVENT";

//action creator to load all events
export const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    payload: events,
  };
};

// action creator to create an event
export const addEvent = (info) => {
  return {
    type: ADD_EVENT,
    payload: info,
  };
};

// //action creator to edit an event
export const edit = (info) => {
  return {
    type: EDIT_EVENT,
    payload: info,
  };
};

// //action creator to delete a group
// export const remove = (id) => {
//   return {
//     type: DELETE_GROUP,
//     payload: id,
//   };
// };

//thunk action creator to load events
export const getAllEvents = () => async (dispatch) => {
  const response = await fetch("/api/events");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEvents(data));
  }
};

//thunk action creator to create an event for a group specified by id
export const createEvent = (id, info) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${id}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addEvent(data));
    return data;
  }
};

// //thunk action creator to edit an event
export const editEvent = (id, info) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${id}`, {
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

// //thunk action creator to delete a group
// export const deleteGroup = (id) => async (dispatch) => {
//   const response = await csrfFetch(`/api/groups/${id}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(remove(id));
//     return data;
//   }
// };

const initialState = {};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const allEvents = {};
      action.payload.Events.forEach((event) => {
        allEvents[event.id] = event;
      });
      return {
        ...state,
        ...allEvents,
      };
    }

    case ADD_EVENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case EDIT_EVENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    // case DELETE_GROUP: {
    //   const newState = { ...state };
    //   console.log("ID???: ", action.payload);
    //   console.log("CURRENT GROUPS:", newState);
    //   delete newState[action.payload];
    //   return newState;
    // }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
