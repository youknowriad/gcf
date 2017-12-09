export function modelLoad(modelName, records) {
  return { type: "MODEL_LOAD", modelName, payload: records };
}

export function modelRemove(modelName, ids) {
  return { type: "MODEL_REMOVE", modelName, payload: ids };
}
