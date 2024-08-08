import { kafkaConsumeReconnect } from "./apache.kafka.consumer.reconnection.service.mjs";
import { kafkaConsumer } from "./apache.kafka.service.mjs";
import { logger } from "../../config/logger.config.mjs";
import { requiredParamsUtility } from "../../utility/required.params.utility.mjs";
import { typeCheckerUtility } from "../../utility/type.checker.utility.mjs";

/**
 * @description Starts consuming messages from Kafka and sets up reconnection logic in case of consumer crashes.
 * @param {function} eventProcesser The function to process each Kafka message. Must be a function.
 * @throws {TypeError} Throws if `eventProcesser` is not a function.
 */
export const kafkaConsume = async (
  eventProcesser = requiredParamsUtility("eventProcesser")
) => {
  typeCheckerUtility(eventProcesser, "function");

  try {
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

    kafkaConsumeReconnect(kafkaConsumer, eventProcesser);
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
