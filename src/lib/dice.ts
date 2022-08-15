const IO = (run) => ({
  run,
  map: (f) => IO(() => f(run())),
  insert: (f) => IO(() => run(f())),
  chain: (f) => IO(() => f(run()).run()),
  concat: (other) => IO(() => run().concat(other.run())),
});
IO.of = (x) => IO(() => x);

const roll = (d: number): number => Math.floor(Math.random() * d) + 1;

const d20 = IO.of(20).map(roll);
const d12 = IO.of(12).map(roll);
const d10 = IO.of(10).map(roll);
const d8 = IO.of(8).map(roll);
const d6 = IO.of(6).map(roll);
const d4 = IO.of(4).map(roll);
const d2 = IO.of(2).map(roll);

export const rollD20 = () => d20.run();
export const rollD12 = () => d12.run();
export const rollD10 = () => d10.run();
export const rollD8 = () => d8.run();
export const rollD6 = () => d6.run();
export const rollD4 = () => d4.run();
export const rollD2 = () => d2.run();

// IO.of(20).map(roll).map(add(-2));
export const DICE_MAP = Object.freeze({
  "0": () => 0,
  "1d2": rollD2,
  "1d4": rollD4,
  "1d6": rollD6,
  "1d8": rollD8,
  "1d10": rollD10,
  "1d12": rollD12,
  "1d20": rollD20,
});
