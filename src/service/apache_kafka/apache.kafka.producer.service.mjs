import { kafkaProducer } from "./apache.kafka.service.mjs";
import { logger } from "../../config/logger.config.mjs";
import { requiredParamsUtility } from "../../utility/required.params.utility.mjs";
import { typeCheckerUtility } from "../../utility/type.checker.utility.mjs";

/**
 * @description Function to send messages to the Kafka Broker with the assigned topic and message(s).
 * @param {string} topic The Kafka topic to publish messages to.
 * @param {Array<object>} messages An array of message objects to be sent to the topic.
 */
export const kafkaProduce = async (
  topic = requiredParamsUtility("topic"),
  messages = requiredParamsUtility("messages")
) => {
  typeCheckerUtility(topic, "string");

  if (
    !Array.isArray(messages) ||
    !messages.every(
      (message) => typeof message === "object" && message !== null
    )
  ) {
    throw new TypeError("messages must be an array of objects!");
  }

  try {
    await kafkaProducer.send({ topic: topic, messages: messages });

    logger.log({
      level: "info",
      message: `Successfully published message to the Kafka Broker. Topic: ${topic}`,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
