export const BROKEN: Status = Object.freeze({
  name: "Broken",
  canCancel: true,
  description: "see Broken on page 29.",
  // TODO: Add DR here
  tests: Object.freeze({
    agility: 0,
    strength: 0,
    presence: 0,
    toughness: 0,
    defense: 0,
    attack: 0,
  }),
});
