import qs from "qs";
import { keys } from "lodash";

import { modelLoad, modelRemove } from "./actions";
import modelsConfig from "./models";

export function modelListRequest(modelName, query) {
  return dispatch => {
    const model = modelsConfig[modelName];
    const request = {
      method: "GET",
      path:
        model.namespace +
        "/" +
        model.root +
        (query ? "?" + qs.stringify(query) : "")
    };

    return wp.apiRequest(request).then(records => {
      const santizedRecords =
        model.type === "object"
          ? keys(records).map(key => ({
              id: key,
              ...records[key]
            }))
          : records;
      return dispatch(modelLoad(modelName, santizedRecords));
    });
  };
}

export function modelCreateRequest(modelName, record) {
  return dispatch => {
    const model = modelsConfig[modelName];
    const request = {
      method: "POST",
      path: model.namespace + "/" + model.root,
      data: record,
      dataType: "json"
    };

    return wp.apiRequest(request).then(record => {
      dispatch(modelLoad(modelName, [record]));
      return record;
    });
  };
}

export function modelUpdateRequest(modelName, record) {
  return dispatch => {
    const model = modelsConfig[modelName];
    const request = {
      method: "PUT",
      path: model.namespace + "/" + model.root + "/" + record.id,
      data: record,
      dataType: "json"
    };

    return wp.apiRequest(request).then(record => {
      dispatch(modelLoad(modelName, [record]));
      return record;
    });
  };
}

export function modelRemoveRequest(modelName, recordId) {
  return dispatch => {
    const model = modelsConfig[modelName];
    const request = {
      method: "DELETE",
      path: model.namespace + "/" + model.root + "/" + recordId,
      dataType: "json"
    };
    return wp.apiRequest(request).then(() => {
      dispatch(modelRemove(modelName, [recordId]));
    });
  };
}
