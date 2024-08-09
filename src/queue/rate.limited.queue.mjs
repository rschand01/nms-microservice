import {
  MAX_JOBS_TO_BE_PROCESSED,
  MAX_JOBS_TO_BE_PROCESSED_DURATION_IN_SECONDS,
} from "../constant/constant.mjs";
import Bull from "bull";
import { logger } from "../config/logger.config.mjs";
import { queueEventListenerUtility } from "../utility/queue.event.listener.utility.mjs";

export const rateLimitedQueue = new Bull("rateLimitedQueue", {
  redis: {
    host: process.env.REDIS_CLIENT_HOST,
    port: process.env.REDIS_CLIENT_PORT,
    password: process.env.REDIS_CLIENT_PASSWORD,
  },

  limiter: {
    max: MAX_JOBS_TO_BE_PROCESSED,
    duration: MAX_JOBS_TO_BE_PROCESSED_DURATION_IN_SECONDS,
  },
});

(async () => {
  try {
    const isReady = await rateLimitedQueue.isReady();

    if (isReady.clients[0].status === "connecting") {
      logger.log({
        level: "info",
        message:
          "Connection to Redis Data Store have been established! (Bull.js)",
      });
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
})();

queueEventListenerUtility(rateLimitedQueue, "rateLimitedQueue");
