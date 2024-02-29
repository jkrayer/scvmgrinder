export const DIZZY: Status = Object.freeze({
  name: "Dizzy",
  canCancel: true,
  description:
    "{name} is dizzy for the next hour. During this time, Powers will always fail in the worst possible way.",
  tests: Object.freeze({
    agility: 0,
    strength: 0,
    presence: 0,
    toughness: 0,
    defense: 0,
    attack: 0,
  }),
  // 60 minutes in milliseconds
  // duration: 60 * 60 * 1000,
});
