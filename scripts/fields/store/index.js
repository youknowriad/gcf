import { registerStore } from "@wordpress/data";

import reducer from "./reducer";
import * as selectors from "./selectors";
import * as actions from "./actions";

registerStore("gcf/fields", { reducer, selectors, actions });
