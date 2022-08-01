import { writable, get } from "svelte/store";
import client from "./Socket";
import CampaignStore from "./Campaign";
import CharacterStore from "./Character";
import type { Message, MessageBody } from "../global";

type TMessageStore = {
  messages: Message[];
};

const MessageStore = writable<TMessageStore>({
  messages: [],
});

const main = async () => {
  try {
    const { data }: { data: Message[] } = await client
      .service("messages")
      .find({
        query: {
          campaignId: "e9lQv3ZyOxnPKyrK",
          $limit: 3,
          $sort: { createdAt: -1 },
        },
      });

    MessageStore.set({
      messages: data,
    });
  } catch (e) {
    console.error("Error getting messages", e.toString());
  }

  // Add any newly created message to the list in real-time
  client.service("messages").on("created", (message: Message) => {
    const { messages } = get(MessageStore);

    MessageStore.set({
      messages: [message, ...messages].slice(0, 3),
    });
  });
};

main();

export default MessageStore;

// TODO: Add TEST Number Here
export const send = ({
  name,
  rollType,
  roll,
  rollFormula,
  target = "",
  dc = null,
}: Partial<MessageBody>) => {
  const { campaign } = get(CampaignStore);
  const { character } = get(CharacterStore);

  const newMessage: Message = {
    campaignId: campaign._id,
    characterId: character._id,
    message: {
      name: name || character.name,
      rollType,
      roll,
      rollFormula,
      target,
      dc,
    },
  };

  client.service("messages").create(newMessage);
};

// BEGIN:TEST
// export const send = ({
//   name,
//   rollType,
//   roll,
//   rollFormula,
//   target = "",
//   dc = null,
// }: Partial<MessageBody>) => {
//   const { campaign } = get(CampaignStore);
//   const { character } = get(CharacterStore);

//   const newMessage: Message = {
//     campaignId: campaign._id,
//     characterId: character._id,
//     message: {
//       name: name || character.name,
//       rollType,
//       roll,
//       rollFormula,
//       target,
//       dc,
//     },
//   };

//   MessageStore.update((oldStore: TMessageStore): TMessageStore => {
//     return { messages: [newMessage, ...oldStore.messages] };
//   });
// };

// MessageStore.subscribe(({ messages }: TMessageStore) => {
//   const head = messages[0];

//   if (!!head && head._id === undefined) {
//     client.service("messages").create(messages[0]);
//   }

//   console.log("subbed", messages);
// });

// END:TEST

export const hide = (id: string) =>
  MessageStore.update(({ messages }: TMessageStore) => {
    return {
      messages: messages.filter(
        (message: Message): boolean => message._id !== id
      ),
    };
  });
