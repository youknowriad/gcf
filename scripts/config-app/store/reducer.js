import { combineReducers } from "redux";
import modelsConfig from "./models";
import { omit } from "lodash";

function model(name) {
  return (state = { byId: {} }, action) => {
    if (!action.modelName || action.modelName !== name) {
      return state;
    }
    switch (action.type) {
      case "MODEL_REMOVE":
        return {
          byId: omit(state.byId, action.payload)
        };
      case "MODEL_LOAD":
        return {
          byId: {
            ...state.byId,
            ...action.payload.reduce(
              (memo, record) => ({
                ...memo,
                [record.id]: record
              }),
              {}
            )
          }
        };
      default:
        return state;
    }
  };
}

export const models = combineReducers(
  Object.keys(modelsConfig).reduce(
    (memo, modelName) => ({
      ...memo,
      [modelName]: model(modelName)
    }),
    {}
  )
);

export default combineReducers({ models });
