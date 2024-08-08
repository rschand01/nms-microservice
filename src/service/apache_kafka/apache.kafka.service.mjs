import { Kafka } from "kafkajs";
import { config as dotEnvConfig } from "dotenv";
import { logger } from "../../config/logger.config.mjs";

dotEnvConfig();

const kafka = new Kafka({
  clientId: process.env.APACHE_KAFKA_CLIENT_ID,
  brokers: [
    process.env.APACHE_KAFKA_BROKER_1,
    process.env.APACHE_KAFKA_BROKER_2,
  ],
});

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({
  groupId: process.env.APACHE_KAFKA_CONSUMER_GROUP_ID,
});

export const initializeKafka = async () => {
  try {
    await kafkaProducer.connect();
    await kafkaConsumer.connect();

    logger.log({
      level: "info",
      message: "Connection to Apache Kafka has been established successfully!",
      additional: `brokers: ${[
        process.env.APACHE_KAFKA_BROKER_1,
        process.env.APACHE_KAFKA_BROKER_2,
      ]}`,
      are: `clientId: ${process.env.APACHE_KAFKA_CLIENT_ID}`,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
      additional: error.stack,
    });
  }
};
