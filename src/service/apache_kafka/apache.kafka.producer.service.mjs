import { kafkaProducer } from "./apache.kafka.service.mjs";
import { logger } from "../../config/logger.config.mjs";

export const kafkaProduce = async (topic, messages = []) => {
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
