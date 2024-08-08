import { logger } from "../../config/logger.config.mjs";
import { requiredParamsUtility } from "../../utility/required.params.utility.mjs";
import { typeCheckerUtility } from "../../utility/type.checker.utility.mjs";

/**
 * @description Sets up an event listener to handle Kafka consumer crashes and attempt reconnection.
 * @param {object} kafkaConsumer The Kafka consumer instance to be monitored and reconnected.
 * @param {function} eventProcesser The function to process each Kafka message. Must be a function.
 * @throws {TypeError} Throws if `eventProcesser` is not a function.
 */
export const kafkaConsumeReconnect = (
  kafkaConsumer = requiredParamsUtility("kafkaConsumer"),
  eventProcesser = requiredParamsUtility("eventProcesser")
) => {
  typeCheckerUtility(eventProcesser, "function");

  kafkaConsumer.on("consumer.crash", async () => {
    logger.log({
      level: "error",
      message: "Kafka consumer crashed. Attempting to reconnect...",
    });

    try {
      await kafkaConsumer.disconnect();
      await kafkaConsumer.connect();
      await kafkaConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            await eventProcesser(topic, partition, message);
          } catch (error) {
            logger.log({
              level: "error",
              message: error.message,
              additional: error.stack,
            });
          }
        },
      });
    } catch (error) {
      logger.log({
        level: "error",
        message: error.message,
        additional: error.stack,
      });
    }
  });
};
