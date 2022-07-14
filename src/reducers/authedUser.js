import { SET_AUTHED_USERS } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USERS:
      return action.id;
    default:
      return state;
  }
}
