import { csrfFetch } from "./csrf";

const LOAD_EVENTS = "/events/LOAD_EVENTS";
const ADD_EVENT = "/events/ADD_EVENT";
const EDIT_EVENT = "/events/EDIT_EVENT";
const DELETE_EVENT = "/events/DELETE_EVENT";

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
export const remove = (id) => {
  return {
    type: DELETE_EVENT,
    payload: id,
  };
};

//thunk action creator to load events
export const getAllEvents = (name) => async (dispatch) => {
  const response = await fetch(`/api/events?name=${name}`);

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

// //thunk action creator to delete an event
export const deleteEvent = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(remove(id));
    return data;
  }
};

const initialState = {};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const allEvents = {};
      action.payload.Events.forEach((event) => {
        allEvents[event.id] = event;
      });
      return {
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

    case DELETE_EVENT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
