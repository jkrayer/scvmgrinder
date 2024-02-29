import { writable } from "svelte/store";

const MessageStore = writable<MessageBody[]>([]);

export default MessageStore;

export function addMessage(message: MessageBody) {
  MessageStore.update(([one, two]: MessageBody[]) => {
    return [message, one, two].filter((x: any) => x !== undefined);
  });
}

export function hide(id: number) {
  MessageStore.update((messages: MessageBody[]) => {
    messages[id] = null;
    return messages.filter((x) => x !== null);
  });
}

//  THE PLAN IS
// addMessage(testmessage(uiMessage()))
