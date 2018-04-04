import classnames from "classnames";
import { mediaUpload } from "@wordpress/utils";
import {
  Placeholder,
  Dashicon,
  Toolbar,
  DropZone,
  FormFileUpload,
  Button,
  IconButton
} from "@wordpress/components";
import { MediaUpload, BlockControls } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const imageBlock = {
  name: "image",
  label: __("Image", "gutenberg-custom-fields"),
  getBlockSettings(fieldConfig) {
    return {
      edit({ attributes, setAttributes, className, focus }) {
        const { content } = attributes;

        const onSelectImage = media => {
          const attributes = { content: media.url };
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
                    <MediaUpload
                      onSelect={onSelectImage}
                      type="image"
                      value={id}
                      render={({ open }) => (
                        <IconButton
                          onClick={open}
                          icon="edit"
                          className="components-toolbar__control"
                          label={__("Edit image", "gutenberg-custom-fields")}
                        />
                      )}
                    />
                  </Toolbar>
                </BlockControls>
              );

              if (!content) {
                return [
                  controls,
                  <Placeholder
                    key="placeholder"
                    instructions={__(
                      "Drag image here or insert from media library",
                      "gutenberg-custom-fields"
                    )}
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
                      {__("Upload", "gutenberg-custom-fields")}
                    </FormFileUpload>
                    <MediaUpload
                      onSelect={onSelectImage}
                      type="image"
                      render={({ open }) => (
                        <Button isLarge onClick={open}>
                          {__(
                            "Insert from Media Library",
                            "gutenberg-custom-fields"
                          )}
                        </Button>
                      )}
                    />
                  </Placeholder>
                ];
              }

              const classes = classnames("gcf-image-block", {
                "is-transient": 0 === content.indexOf("blob:")
              });

              return [
                controls,
                <img key="image" src={content} className={classes} />
              ];
            }}
          </Field>
        );
      }
    };
  }
};

export default imageBlock;
