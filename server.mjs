import cors from "cors";
import { config as dotEnvConfig } from "dotenv";
import { envValidator } from "./src/validator/env.validator.mjs";
import express from "express";
import { initializeKafka } from "./src/service/apache_kafka/apache.kafka.service.mjs";
import { kafkaConsumerSubscribe } from "./src/service/apache_kafka/apache.kafka.consumer.subscriber.service.mjs";
import { logger } from "./src/config/logger.config.mjs";
import { rateLimitedQueueWorker } from "./src/worker/rate.limited.queue.worker.mjs";
import { rateLimiter } from "./src/middleware/rate.limit.middleware.mjs";
import { router } from "./src/router/router.mjs";

const app = express();

dotEnvConfig();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

try {
  if (error) {
    logger.log({ level: "error", message: error.message });
    process.exit(1);
  }

  await initializeKafka();
  await kafkaConsumerSubscribe("transcational", true);
  await kafkaConsumerSubscribe("promotional", true);

  rateLimitedQueueWorker();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors(corsOptions));

  app.use(rateLimiter);
  app.use("/", router);

  app.listen(process.env.EXPRESS_PORT, () => {
    logger.log({
      level: "info",
      message: "Express Server is successfully listening!",
      additional: `port: ${process.env.EXPRESS_PORT}`,
    });
  });
} catch (error) {
  logger.log({
    level: "error",
    message: error.message,
    additional: error.stack,
  });
}
