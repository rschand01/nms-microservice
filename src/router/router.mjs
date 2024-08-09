import express from "express";
import { notificationConsumerController } from "../controller/notification.consumer.controller.mjs";
import { notificationProducerController } from "../controller/notification.producer.controller.mjs";

export const router = express.Router();

router.post("/produce-notification", notificationProducerController);
router.post("/consume-notification", notificationConsumerController);
