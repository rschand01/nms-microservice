import Joi from "joi";

export const envValidator = Joi.object({
  EXPRESS_PORT: Joi.string().required(),
  APACHE_KAFKA_CLIENT_ID: Joi.string().required(),
  APACHE_KAFKA_BROKER_1: Joi.string().required(),
  APACHE_KAFKA_BROKER_2: Joi.string().required(),
  APACHE_KAFKA_CONSUMER_GROUP_ID: Joi.string().required(),
  KAFKAJS_NO_PARTITIONER_WARNING: Joi.string().required(),
  REDIS_CLIENT_HOST: Joi.string().required(),
  REDIS_CLIENT_PORT: Joi.string().required(),
  REDIS_CLIENT_PASSWORD: Joi.string().required(),
}).unknown(true);
