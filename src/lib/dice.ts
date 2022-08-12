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

export const rollD20 = () => d20.run();
export const rollD12 = () => d12.run();
export const rollD10 = () => d10.run();
export const rollD8 = () => d8.run();
export const rollD6 = () => d6.run();
export const rollD4 = () => d4.run();
