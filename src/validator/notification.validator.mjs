import Joi from "joi";

export const notificationValidator = Joi.object({
  notificationTopic: Joi.string().required(),
  notificationData: Joi.object({
    notificationType: Joi.string().required(),
    notificationTag: Joi.string().required(),
    notificationIdentifier: Joi.string().required(),
    notificationMessage: Joi.string().required(),
  }).required(),
});
