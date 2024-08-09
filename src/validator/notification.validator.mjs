import Joi from "joi";

export const notificationValidator = Joi.object({
  notificationTopic: Joi.string().required(),

  notificationData: Joi.object({
    notificationType: Joi.string().required(),
    notificationTag: Joi.string().required(),
    notificationIdentifier: Joi.string().required(),
    notificationMessage: Joi.string().required(),

    additionalNotificationData: Joi.object({
      userFirstName: Joi.string().required(),
      userLastName: Joi.string().required(),
      userName: Joi.string().required(),
      userEmailAddress: Joi.string().required(),
      userPhoneContact: Joi.string().required(),

      userCommunicationPreference: Joi.object({
        emailNotification: Joi.boolean().required(),
        smsNotification: Joi.boolean().required(),
        pushNotification: Joi.boolean().required(),
      }).required(),
    }).required(),
  }).required(),
});
