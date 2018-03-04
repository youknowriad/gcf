import { dispatch } from "@wordpress/data";

import text from "./text";
import image from "./image";
import textarea from "./textarea";
import number from "./number";
import email from "./email";
import datetime from "./datetime";
import date from "./date";
import time from "./time";
import free from "./free";

const fields = [
  text,
  image,
  textarea,
  number,
  email,
  datetime,
  date,
  time,
  free
];

fields.forEach(field => dispatch("gcf/fields").register(field));
