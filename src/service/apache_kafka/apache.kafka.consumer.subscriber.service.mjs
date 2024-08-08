import { kafkaConsumer } from "./apache.kafka.service.mjs";
import { logger } from "../../config/logger.config.mjs";

export const kafkaConsumerSubscribe = async (topic, fromBeginning) => {
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
