import { find, filter, isArray, intersection, identity } from "lodash";

export function getRecords(state, modelName, mapFunction = identity) {
  return Object.values(state.models[modelName].byId).map(mapFunction);
}

export function getRecord(state, modelName, id) {
  return state.models[modelName].byId[id];
}

export function getRecordBy(state, modelName, attributeName, value) {
  return find(
    state.models[modelName].byId,
    record =>
      isArray(value)
        ? intersection(record[attributeName], value).length === value.length
        : record[attributeName] === value
  );
}

export function getRecordsBy(state, modelName, attributeName, value) {
  return filter(state.models[modelName].byId, record => {
    if (isArray(record[attributeName])) {
      return intersection(record[attributeName], value).length === value.length;
    }

    if (isArray(value)) {
      return value.indexOf(record[attributeName]) !== -1;
    }

    return record[attributeName] === value;
  });
}
