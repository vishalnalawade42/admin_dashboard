import ACTION_TYPES from "./actions";

export default function reducer(state, action) {
  if (action.type === ACTION_TYPES.INITIAL_LOAD) {
    return action.payload;
  } else if (action.type === ACTION_TYPES.SINGLE_DELETE) {
    return state.filter(
      (current) =>
        current[action.uniqueIdentifier] !==
        action.payload[action.uniqueIdentifier]
    );
  } else if (action.type === ACTION_TYPES.MULTI_DELETE) {
    return state.filter(
      (current) => !action.payload.includes(current[action.uniqueIdentifier])
    );
  } else if (action.type === ACTION_TYPES.SINGLE_UPDATE) {
    return state.map((current) =>
      current[action.uniqueIdentifier] ===
      action.payload[action.uniqueIdentifier]
        ? action.payload
        : current
    );
  }

  return state;
}
