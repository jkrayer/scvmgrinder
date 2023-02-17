export const ENCUMBERED: Status = Object.freeze({
  name: "Encumbered",
  canCancel: false,
  description:
    "{name} is carrying too many items. DR+2 on Agility/Strength tests.",
  tests: Object.freeze({
    agility: 2,
    strength: 2,
    presence: 0,
    toughness: 0,
    defense: 0,
    attack: 0,
  }),
});
