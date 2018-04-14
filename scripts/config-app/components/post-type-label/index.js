import { get } from "lodash";
import { withSelect } from "@wordpress/data";

function PostTypeLabel({ postType }) {
  return get(postType, ["name"], false);
}

export default withSelect((select, { slug }) => ({
  postType: select("core").getPostType(slug)
}))(PostTypeLabel);
