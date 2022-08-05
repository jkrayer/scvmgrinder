import { writable } from "svelte/store";

type UIState = { targeting: boolean };
// type UpdateFN = (arg1: UIState) => UIState;

const UI = writable<UIState>({
  targeting: false,
});

export default UI;

export const setTarget = () =>
  UI.update((data) => ({ ...data, targeting: true }));

export const unsetTarget = () =>
  UI.update((data) => ({ ...data, targeting: false }));

UI.subscribe((data) => {
  // console.log("UIDATA", data);
});
