import { logger } from "../config/logger.config.mjs";
import { rateLimitedQueue } from "../queue/rate.limited.queue.mjs";
import { requiredParamsUtility } from "../utility/required.params.utility.mjs";
import { typeCheckerUtility } from "../utility/type.checker.utility.mjs";

export const emailSendingJob = async (
  notificationData = requiredParamsUtility("notificationData")
) => {
  typeCheckerUtility(notificationData, "object");

  try {
    await rateLimitedQueue.add(notificationData, {
      priority: 4,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};

export const smsSendingJob = async (notificationData) => {
  try {
    await rateLimitedQueue.add(notificationData, {
      priority: 3,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};

export const pushNotificationJob = async (notificationData) => {
  try {
    await rateLimitedQueue.add(notificationData, {
      priority: 2,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};

export const otpSmsSendingJob = async (notificationData) => {
  try {
    await rateLimitedQueue.add(notificationData, {
      priority: 1,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
