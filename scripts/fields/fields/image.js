import classnames from "classnames";
import { mediaUpload } from "@wordpress/utils";
import {
  Placeholder,
  DropZone,
  FormFileUpload,
  Button
} from "@wordpress/components";
import { MediaUpload } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const imageBlock = {
  name: "image",
  label: __("Image", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    const onSelectImage = media => onChange(media.url);
    const uploadFromFiles = event =>
      mediaUpload(event.target.files, onSelectImage);
    const dropFiles = files => mediaUpload(files, onSelectImage);
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {id => {
          if (!value) {
            return (
              <Placeholder
                instructions={__(
                  "Drag image here or insert from media library",
                  "gutenberg-custom-fields"
                )}
                icon="format-image"
                label={"Image"}
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
            );
          }

          const classes = classnames("gcf-image-block", {
            "is-transient": 0 === value.indexOf("blob:")
          });

          return (
            <MediaUpload
              onSelect={onSelectImage}
              type="image"
              value={id}
              render={({ open }) => (
                <img src={value} className={classes} onClick={open} />
              )}
            />
          );
        }}
      </Field>
    );
  }
};

export default imageBlock;
