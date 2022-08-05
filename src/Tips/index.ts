// TODO: GET Application Settings
import { info } from "../components/Toasts/ToastStore";
import type { ToastParams } from "../components/Toasts/type";

const SHOW_TIPS = true;

function noop() {}

const ATTACK_TIP: ToastParams = {
  text: "Select a target in the tracker",
  expireIn: 2000,
};

export const Attack = SHOW_TIPS ? () => info(ATTACK_TIP) : noop;
