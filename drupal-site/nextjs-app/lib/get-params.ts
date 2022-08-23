import { DrupalJsonApiParams } from "drupal-jsonapi-params"

// A helper function to build params for a resource type.
export function getParams(
  name: string,
  mode: string | null
): DrupalJsonApiParams {
  const params = new DrupalJsonApiParams()

  name = mode ? `${name}--${mode}` : name

  if (name === "node--page") {
    return params
      .addFilter("status", "1")
      .addFields("node--page", ["title", "body", "status"])
  }

  if (name === "node--animals") {
    return params
      .addFilter("status", "1")
      .addInclude(["field_media_image.field_media_image", "uid.user_picture"])
      .addFields("node--article", ["title", "path", "field_media_image"])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta"])
  }

  if (name === "node--animals--item") {
    return params
      .addInclude([
        "field_media_image.field_media_image",
        "uid.user_picture",
        "field_tags",
      ])
      .addFields("node--article", [
        "title",
        "status",
        "path",
        "field_media_image",
        "body",
        "created",
        "uid",
        "field_tags",
      ])
      .addFields("user--user", ["display_name", "user_picture"])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta"])
      .addFields("taxonomy_term--tags", ["name", "path"])
  }

  if (name === "menu_link_content--menu_link_content") {
    return params.addFields("menu_link_content--menu_link_content", [
      "title,url",
    ])
  }

  //default return
  return params;

}
