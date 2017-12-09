import { Component } from "react";
import { connect } from "react-redux";
import { isEqual } from "lodash";

import { modelListRequest } from "../../store/effects";

class QueryModelList extends Component {
  componentDidMount() {
    this.request();
  }

  componentDidUpdate(previousProps) {
    const { modelName, query } = this.props;
    if (
      modelName !== previousProps.modelName ||
      !isEqual(query, previousProps.query)
    ) {
      this.request();
    }
  }

  request() {
    const { modelName, query } = this.props;
    this.props.modelListRequest(modelName, query);
  }

  render() {
    return null;
  }
}

export default connect(undefined, { modelListRequest })(QueryModelList);
