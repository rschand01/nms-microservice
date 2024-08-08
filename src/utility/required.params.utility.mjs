/**
 * @description Validate a parameter. Throws an error if the parameter is missing or of the wrong type. If the parameter is missing or not of type string, an error is thrown. The final error is always thrown to ensure the parameter is properly validated.
 * @param {string} param The name of the parameter being validated. This should be a string describing the parameter that is required.
 * @throws {Error} Throws an error if the parameter is undefined, null, or if it's not a string.
 */
export const requiredParamsUtility = (param) => {
  if (param === undefined || param === null) {
    throw new Error("param is required!");
  }

  if (typeof param !== "string") {
    throw new TypeError("param must be of type string!");
  }

  throw new Error(`${param} is required!`);
};
