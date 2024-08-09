import { emailSenderUtility } from "../utility/email.sender.utility.mjs";
import { logger } from "../config/logger.config.mjs";
import { pushNotifierUtility } from "../utility/push.notifier.utility.mjs";
import { rateLimitedQueue } from "../queue/rate.limited.queue.mjs";
import { smsSenderUtility } from "../utility/sms.sender.utility.mjs";

export const rateLimitedQueueWorker = () => {
  try {
    rateLimitedQueue.process(async (job) => {
      try {
        logger.log({
          level: "info",
          message: `Processing Job: ${job.id}`,
        });

        emailSenderUtility(job.data);
        smsSenderUtility(job.data);
        pushNotifierUtility(job.data);
      } catch (error) {
        logger.log({
          level: "error",
          message: error.message,
          additional: error.stack,
        });
      }
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
