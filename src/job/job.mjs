import { emailSenderUtility } from "../utility/email.sender.utility.mjs";
import { logger } from "../config/logger.config.mjs";
import { pushNotifierUtility } from "../utility/push.notifier.utility.mjs";
import { rateLimitedQueue } from "../queue/rate.limited.queue.mjs";
import { smsSenderUtility } from "../utility/sms.sender.utility.mjs";

export const emailSendingJob = async (notificationData) => {
  try {
    await rateLimitedQueue.add(emailSenderUtility(notificationData), {
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
    await rateLimitedQueue.add(smsSenderUtility(notificationData), {
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
    await rateLimitedQueue.add(pushNotifierUtility(notificationData), {
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
    await rateLimitedQueue.add(smsSenderUtility(notificationData), {
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
