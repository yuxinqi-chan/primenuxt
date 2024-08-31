import type { H3Event } from "h3";
import * as yup from "yup";

export const getYupRouterParams = <T extends yup.AnySchema>(
  event: H3Event,
  schema: T,
) => {
  return getValidatedRouterParams(event, (data) => schema.validate(data));
};

export const readYupBody = <T extends yup.AnySchema>(
  event: H3Event,
  schema: T,
) => {
  return readValidatedBody(event, (data) => schema.validate(data));
};

export const getYupQuery = <T extends yup.AnySchema>(
  event: H3Event,
  schema: T,
) => {
  return getValidatedQuery(event, (data) => schema.validate(data));
};

export const getYupFormData = async <T extends yup.AnySchema>(
  event: H3Event,
  schema: T,
) => {
  const formData = await readFormData(event);
  const data = formDataToObject(formData);
  return schema.validate(data);
};

function formDataToObject(formData: FormData) {
  const normalizeValues = (values: FormDataEntryValue[]) =>
    values.length > 1 ? values : values[0];
  const formElemKeys = Array.from(formData.keys());

  return Object.fromEntries(
    formElemKeys.map((key) => [key, normalizeValues(formData.getAll(key))]),
  );
}
