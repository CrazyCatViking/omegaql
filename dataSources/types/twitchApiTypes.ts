export enum SubscriptionTypes {
  streamsOnline = 'streams.online',
}

export interface ITwitchUserResult {
  data: ITwitchUser[];
}

export interface ITwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
}

export interface ICurrentTwitchSubscriptions {
  data: ITwitchSubscription[];
  total: number;
  total_cost: number;
  max_total_cost: number;
  pagination: any;
}

export interface ITwitchSubscription {
  id: string;
  status: string;
  type: string;
  version: string;
  cost: number;
  condition: Record<string, string>;
  created_at: string;
  transport: ITwitchSubscriptionTransport;
}

export interface ITwitchSubscriptionTransport {
  method: string;
  callback: string;
  secret?: string;
}

export interface ITwitchWebhookPayload {
  type: string;
  version: string;
  condition: Record<string, string>;
  transport?: ITwitchSubscriptionTransport;
}