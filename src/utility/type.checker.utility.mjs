import { requiredParamsUtility } from "./required.params.utility.mjs";

/**
 * @description Checks the type of a given element. Throws an error if the element is not of the expected type or if the parameters are invalid.
 * @param {string} element The value whose type is being checked. Must be a string.
 * @param {string} type The expected type of the element. Should be one of the allowed types.
 * @throws {TypeError} Throws an error if `element` is not a string, or if `type` is not in the allowed types, or if `element` is not of the expected type.
 */
export const typeCheckerUtility = (
  element = requiredParamsUtility("element"),
  type = requiredParamsUtility("type")
) => {
  const allowedTypes = [
    "bigint",
    "boolean",
    "function",
    "number",
    "object",
    "string",
    "symbol",
  ];

  const isAllowedType = allowedTypes.includes(type);

  if (!isAllowedType) {
    throw new TypeError(
      `type must be one of the following: ${allowedTypes.join(", ")}`
    );
  }

  if (typeof element !== type) {
    throw new TypeError(`${element} must be of type ${type}`);
  }
};
