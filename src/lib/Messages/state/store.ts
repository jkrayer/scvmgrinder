import { writable } from 'svelte/store';

// Because there might be more types... thinking types like redux reducer
type Message = MessageBody | Message.Test;

const MessageStore = writable<Message[]>([]);

export default MessageStore;

export function addMessage(message: Message) {
	MessageStore.update(([one, two]: Message[]) => {
		return [message, one, two].filter((x: Message | undefined) => x !== undefined);
	});
}

export function hide(index: number) {
	MessageStore.update((messages: Message[]) => messages.filter((_, i) => i !== index));
}
