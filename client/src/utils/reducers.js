import { useReducer } from "react";
import { UPDATE_ROOMS, UPDATE_USERS } from "./actions";

export const reducer = (state, action) => {
  console.log(action.state, "act.state");
  console.log(state, "state");
  switch (action.type) {
    case UPDATE_ROOMS:
      return {
        ...state,
        rooms: [...state.rooms, action.rooms],
      };
    case UPDATE_USERS:
      return {
        ...state,
        users: [...state.users, action.users],
      };

    default:
      return state;
  }
};

export function useChatReducer(initialState) {
  return useReducer(reducer, initialState);
}
