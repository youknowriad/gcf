import classnames from "classnames";
import { mediaUpload } from "@wordpress/utils";
import {
  Placeholder,
  Dashicon,
  Toolbar,
  DropZone,
  FormFileUpload
} from "@wordpress/components";
import { MediaUploadButton, BlockControls } from "@wordpress/blocks";

import Field from "../components/field";

const imageBlock = {
  getBlockSettings(fieldConfig) {
    return {
      title: "GCF Image",
      icon: "format-image",
      category: "common",
      isPrivate: true,
      attributes: {
        url: {
          type: "string",
          source: "meta",
          meta: fieldConfig.name
        }
      },
      edit({ attributes, setAttributes, className, focus }) {
        const { url } = attributes;

        const uploadButtonProps = { isLarge: true };
        const onSelectImage = media => {
          const attributes = { url: media.url };
          setAttributes(attributes);
        };
        const uploadFromFiles = event =>
          mediaUpload(event.target.files, onSelectImage);
        const dropFiles = files => mediaUpload(files, onSelectImage);
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {id => {
              const controls = focus && (
                <BlockControls key="controls">
                  <Toolbar>
                    <MediaUploadButton
                      buttonProps={{
                        className:
                          "components-icon-button components-toolbar__control",
                        "aria-label": "Edit image"
                      }}
                      onSelect={onSelectImage}
                      type="image"
                      value={id}
                    >
                      <Dashicon icon="edit" />
                    </MediaUploadButton>
                  </Toolbar>
                </BlockControls>
              );

              if (!url) {
                return [
                  controls,
                  <Placeholder
                    key="placeholder"
                    instructions={
                      "Drag image here or insert from media library"
                    }
                    icon="format-image"
                    label={"Image"}
                    className={className}
                  >
                    <DropZone onFilesDrop={dropFiles} />
                    <FormFileUpload
                      id={id}
                      isLarge
                      className="wp-block-image__upload-button"
                      onChange={uploadFromFiles}
                      accept="image/*"
                    >
                      {"Upload"}
                    </FormFileUpload>
                    <MediaUploadButton
                      buttonProps={uploadButtonProps}
                      onSelect={onSelectImage}
                      type="image"
                    >
                      {"Insert from Media Library"}
                    </MediaUploadButton>
                  </Placeholder>
                ];
              }

              const classes = classnames("gcf-image-block", {
                "is-transient": 0 === url.indexOf("blob:")
              });

              return [
                controls,
                <img key="image" src={url} className={classes} />
              ];
            }}
          </Field>
        );
      },

      save() {
        return null;
      }
    };
  }
};

export default imageBlock;
