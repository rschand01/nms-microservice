import { kafkaConsumer } from "./apache.kafka.service.mjs";
import { logger } from "../../config/logger.config.mjs";
import { requiredParamsUtility } from "../../utility/required.params.utility.mjs";
import { typeCheckerUtility } from "../../utility/type.checker.utility.mjs";

/**
 * @description Function to subscribe to a Kafka topic.
 * @param {string} topic The Kafka topic to subscribe to.
 * @param {boolean} fromBeginning Whether to start reading from the beginning of the topic.
 * @throws {TypeError} Throws if `topic` is not a string or `fromBeginning` is not a boolean.
 */
export const kafkaConsumerSubscribe = async (
  topic = requiredParamsUtility("topic"),
  fromBeginning = requiredParamsUtility("fromBeginning")
) => {
  typeCheckerUtility(topic, "string");
  typeCheckerUtility(fromBeginning, "boolean");

  try {
    await kafkaConsumer.subscribe({
      topic: topic,
      fromBeginning: fromBeginning,
    });

    logger.log({
      level: "info",
      message: `Successfully subscribed to the Topic: ${topic}`,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
