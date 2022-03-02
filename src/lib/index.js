export const symbol = (score) =>
  score === 0 ? `±${score}` : score > 0 ? `+${score}` : score;

export const roll = (d, n = 1) => Math.floor(Math.random() * d) + 1;

export const trace = (message) => (x) => {
  console.log(message, x);
  return x;
};

export const generateEmptyCharacter = (id) => ({
  id,
  name: "New Character",
  description: "",
  class: {
    name: "",
    powers: [],
  },
  hitpoints: {
    maximum: 0,
    current: 0,
  },
  omens: {
    die: 0,
    current: 0,
  },
  abilities: {
    strength: 0,
    agility: 0,
    presence: 0,
    toughness: 0,
  },
  equipment: [],
  silver: 0,
});
