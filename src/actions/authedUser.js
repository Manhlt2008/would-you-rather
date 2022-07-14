export const SET_AUTHED_USERS = "SET_AUTHED_USERS";

export default function setAuthedUsers(id) {
  return {
    type: SET_AUTHED_USERS,
    id,
  };
}
