export function get(state, name) {
  return state[name];
}

export function all(state) {
  return Object.values(state);
}
