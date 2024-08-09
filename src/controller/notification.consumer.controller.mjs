import { kafkaConsume } from "../service/apache_kafka/apache.kafka.consumer.service.mjs";
import { logger } from "../config/logger.config.mjs";
import { mainEventProcesserEvent } from "../event/main.event.processer.event.mjs";

export const notificationConsumerController = async (_request, response) => {
  try {
    await kafkaConsume(mainEventProcesserEvent);

    response.status(200).json({
      responseData: "Kafka Consumer is set up and listening for notifications!",
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });

    response.status(500).send("Internal Server Error!");
  }
};
