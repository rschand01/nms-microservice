import { kafkaProduce } from "../service/apache_kafka/apache.kafka.producer.service.mjs";
import { logger } from "../config/logger.config.mjs";
import { notificationValidator } from "../validator/notification.validator.mjs";

export const notificationProducerController = async (request, response) => {
  const { error, value } = notificationValidator.validate(request.body);

  if (error) {
    return response.status(400).json({ responseData: error.message });
  }

  const { notificationTopic, notificationData } = value;

  try {
    await kafkaProduce(notificationTopic, [
      { value: JSON.stringify(notificationData) },
    ]);

    return response.status(200).json({
      responseData: `Notification has been successfully published to the Kafka Broker. Topic: ${notificationTopic}`,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });

    return response
      .status(500)
      .json({ responseData: "Internal Server Error!" });
  }
};
