import { Express } from "express";
import { useTwitchWebhook } from "./webhooks/twitchWebhook";

export const useWebhooks = (app: Express) => {
  app.post('/hooks/twitch', useTwitchWebhook);
} 