import { logger } from "../config/logger.config.mjs";
import { requiredParamsUtility } from "./required.params.utility.mjs";
import { typeCheckerUtility } from "./type.checker.utility.mjs";

/**
 * @description Logs the notification message and tag to the configured logger.
 * @todo In production implement a valid sms sender such as SendGrid.
 * @param {object} notificationData The data for the notification.
 */
export const smsSenderUtility = (
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
