import { get } from "svelte/store";
import type { Message, MessageBody } from "../global";
import client from "../stores/Socket";
import { MESSAGE_SERVICE } from "./api_constants";
import CampaignStore from "../stores/Campaign";
import CharacterStore from "../stores/Character";

// Message Types
// type {}

// Core Sender
function sendMessage(message: MessageBody) {
  const { campaign } = get(CampaignStore);
  const { character } = get(CharacterStore);

  client.service(MESSAGE_SERVICE).create({
    campaignId: campaign._id,
    characterId: character._id,
    message,
  });
}

// Public API
export const toHit = (toHitMessage: Partial<MessageBody>): void => {
  sendMessage({
    rollType: "To Hit",
    ...toHitMessage,
  } as MessageBody);
};

// Public API
export const toDamage = (damageMessage: Partial<MessageBody>): void => {
  sendMessage({
    rollType: "Damage",
    ...damageMessage,
  } as MessageBody);
};

/**
 * NOTES:
 * Method I:  UI Sends Message to Server -> Server Receives -> Server Saves -> Server Broadcasts to Room
 *    ERROR: UI Handles Error and Alerts User
 * Method II: UI Saves Message -> UI Sends Message to Server -> Server Receives -> Server Saves -> Server Broadcasts to Room
 *    ERROR: UI Handles Error, Alerts User and Affects Unsaved Message
 *
 * Conclusion: Method II is probably more user friendly but Method I is simpler so for the moment will use METHOD I
 */
