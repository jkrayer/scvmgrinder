import { writable, get } from "svelte/store";

type UserState = {
  characterId: string;
  user: "player" | "dm";
};

const USER = writable<UserState>({
  characterId: "UTetg6vHrvwG2o19",
  user: "player",
});

export default USER;
// export const login = async (u: string, p: string): void => {
//   constawait doLogin()
// };

// TEST CHARACTERS
// Katla:UTetg6vHrvwG2o19
// Brinta:JEx2BC6COHdTEKMC
// Wemut:cQ65cmnnFbuEMEDJ
// Klort: HxKImT8kJwc4xGC6
// Torn: t8xKi3fBbOtlsbBb
// Vatan: F7bATPIJ558NwzOu

export function isPlayer(): boolean {
  return get(USER).user === "player";
}

export function isDM(): boolean {
  return get(USER).user === "dm";
}
