import type { rollFormula } from "../lib";

export type MessageBody = {
  name: string;
  rollType: "To Hit" | "Damage" | "Test" | "Armor";
  roll: number;
  rollFormula: string;
  target: string;
  dc?: number;
};

export type Message = {
  _id?: string;
  hidden?: boolean;
  campaignId: string; // room
  characterId: string; // sender
  message: MessageBody;
};

const testMessage = (x: Partial<MessageBody>) => ({
  ...x,
  rollType: "Test",
  rollFormula: `1d20`,
});
