import { logger } from "../../config/logger.config.mjs";

export const kafkaConsumeReconnect = (kafkaConsumer, eventProcesser) => {
  if (typeof eventProcesser !== "function") {
    throw new TypeError("eventProcesser must be a function");
  }

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
          eventProcesser(topic, partition, message);
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
