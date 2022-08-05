import { writable } from "svelte/store";
import type { Toast, ToastParams } from "./type";

const ToastStore = writable<Toast[]>([]);

function autoDismiss() {
  const now = Date.now();

  ToastStore.update((oldStore: Toast[]): Toast[] =>
    oldStore.filter(
      (t: Toast) => t.expireTime === undefined || now < t.expireTime
    )
  );
}

let timer: ReturnType<typeof setTimeout>;

ToastStore.subscribe((currentState: Toast[]) => {
  if (currentState.length === 0) {
    clearTimeout(timer);
  } else {
    timer = setTimeout(autoDismiss, 1000);
  }
});

export default ToastStore;

// HOW TO DO WITH FP - I'M THINKING IO Monad
export function info({ text, title = "", expireIn = -1 }: ToastParams) {
  const infoMessage: Toast = {
    title,
    color: "blue",
    text,
  };

  if (expireIn !== -1) {
    infoMessage.expireTime = Date.now() + expireIn;
  }

  ToastStore.update((oldStore: Toast[]): Toast[] =>
    oldStore.concat(infoMessage)
  );
}
