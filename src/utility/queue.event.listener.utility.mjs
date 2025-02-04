import { logger } from "../config/logger.config.mjs";
import { requiredParamsUtility } from "./required.params.utility.mjs";
import { typeCheckerUtility } from "./type.checker.utility.mjs";

/**
 * @description Sets up event listeners for a Bull queue to log various events, such as job status changes and errors.
 *
 * @param {Bull} queue The Bull queue instance to attach event listeners to.
 * @param {string} queueName The name of the queue, used in log messages for context.
 */
export const queueEventListenerUtility = (
  queue = requiredParamsUtility("queue"),
  queueName = requiredParamsUtility("queueName")
) => {
  typeCheckerUtility(queueName, "string");

  try {
    queue.on("active", (job) => {
      logger.log({
        level: "info",
        message: `Job ${job.id} is active!`,
      });
    });

    queue.on("completed", (job) => {
      logger.log({
        level: "info",
        message: `Job ${job.id} completed!`,
      });
    });

    queue.on("progress", (job) => {
      logger.log({
        level: "info",
        message: `Job ${job.id} in progress!`,
      });
    });

    queue.on("waiting", (job) => {
      logger.log({
        level: "info",
        message: `Job ${job} is waiting!`,
      });
    });

    queue.on("stalled", (job) => {
      logger.log({
        level: "info",
        message: `Job ${job.id} is stalled!`,
      });
    });

    queue.on("failed", (job) => {
      logger.log({
        level: "info",
        message: `Job ${job.id} failed!`,
      });
    });

    queue.on("removed", (job) => {
      logger.log({
        level: "info",
        message: `Job ${job.id} removed successfully!`,
      });
    });

    queue.on("paused", () => {
      logger.log({
        level: "info",
        message: `The ${queueName} is paused!`,
      });
    });

    queue.on("resumed", () => {
      logger.log({
        level: "info",
        message: `The ${queueName} is resumed!`,
      });
    });

    queue.on("cleaned", (oldJobs) => {
      logger.log({
        level: "info",
        message: `Old Jobs: ${oldJobs}`,
      });
    });

    queue.on("drained", () => {
      logger.log({
        level: "info",
        message:
          "All waiting jobs have been processed. There can be some delayed job not yet processed!",
      });
    });

    queue.on("error", (error) => {
      logger.log({
        level: "error",
        message: error.message,
        additional: error.stack,
      });
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
