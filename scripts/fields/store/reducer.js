import { reduce } from "lodash";

function reducer(state = {}, action) {
  if (action.type === "FIELDS_ADD") {
    return {
      ...state,
      ...reduce(
        action.fields,
        (memo, field) => ({
          ...memo,
          [field.name]: field
        }),
        {}
      )
    };
  }

  return state;
}

export default reducer;
