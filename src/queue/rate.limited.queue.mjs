import {
  MAX_JOBS_TO_BE_PROCESSED,
  MAX_JOBS_TO_BE_PROCESSED_DURATION_IN_SECONDS,
} from "../constant/constant.mjs";
import Bull from "bull";
import { redisClient } from "../store/redis.client.store.mjs";

export const rateLimitedQueue = new Bull("rateLimitedQueue", {
  redis: redisClient,

  limiter: {
    max: MAX_JOBS_TO_BE_PROCESSED,
    duration: MAX_JOBS_TO_BE_PROCESSED_DURATION_IN_SECONDS,
  },
});
