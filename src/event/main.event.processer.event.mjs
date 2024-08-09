import {
  emailSendingJob,
  otpSmsSendingJob,
  pushNotificationJob,
  smsSendingJob,
} from "../job/job.mjs";
import { OTP } from "../constant/constant.mjs";
import { logger } from "../config/logger.config.mjs";

export const mainEventProcesserEvent = async (_topic, _partition, message) => {
  const notificationData = JSON.parse(message.value);
  const notificationPreference =
    notificationData.additionalNotificationData.userCommunicationPreference;

  const emailNotificationPreference = notificationPreference.emailNotification;
  const smsNotificationPreference = notificationPreference.smsNotification;
  const pushNotificationPreference = notificationPreference.pushNotification;

  try {
    if (notificationData.notificationTag === OTP) {
      await otpSmsSendingJob(notificationData);
    } else {
      if (emailNotificationPreference) {
        await emailSendingJob(notificationData);
      }

      if (smsNotificationPreference) {
        await smsSendingJob(notificationData);
      }

      if (pushNotificationPreference) {
        await pushNotificationJob(notificationData);
      }
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
