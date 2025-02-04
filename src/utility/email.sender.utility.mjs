import { logger } from "../config/logger.config.mjs";
import { requiredParamsUtility } from "./required.params.utility.mjs";
import { typeCheckerUtility } from "./type.checker.utility.mjs";

/**
 * @description Logs the notification message and tag to the configured logger.
 * @todo In production implement a valid email sender such as Nodemailer or SendGrid.
 * @param {object} notificationData The data for the notification.
 */
export const emailSenderUtility = (
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
