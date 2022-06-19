import { writable, get } from "svelte/store";
import client from "../../stores/Socket";
import type { Message } from "../../global";

const MessageStore = writable<{
  messages: Message[];
}>({
  messages: [],
});

const main = async () => {
  try {
    const { data }: { data: Message[] } = await client
      .service("messages")
      .find({ query: { campaignId: "e9lQv3ZyOxnPKyrK", $limit: 3 } });

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

const send = (message: Message) => client.service("messages").create(message);

export default {
  subscribe: MessageStore.subscribe,
  send,
};
