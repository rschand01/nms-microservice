import { logger } from "../config/logger.config.mjs";
import { requiredParamsUtility } from "./required.params.utility.mjs";
import { typeCheckerUtility } from "./type.checker.utility.mjs";

export const pushNotifierUtility = (
  notificationData = requiredParamsUtility("notificationData")
) => {
  typeCheckerUtility(notificationData, "object");

  try {
    logger.log({
      level: "info",
      message: notificationData.notificationMessage,
      additional: notificationData.notificationTag,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
