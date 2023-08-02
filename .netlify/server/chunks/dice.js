const IO = (run) => ({
  run,
  map: (f) => IO(() => f(run())),
  insert: (f) => IO(() => run(f())),
  chain: (f) => IO(() => f(run()).run()),
  // when f returns an IO
  concat: (other) => IO(() => run().concat(other.run()))
  // when run() returns an IO
});
IO.of = (x) => IO(() => x);
const roll = (d) => Math.floor(Math.random() * d) + 1;
const d20 = IO.of(20).map(roll);
const d12 = IO.of(12).map(roll);
const d10 = IO.of(10).map(roll);
const d8 = IO.of(8).map(roll);
const d6 = IO.of(6).map(roll);
const d4 = IO.of(4).map(roll);
const d3 = IO.of(3).map(roll);
const d2 = IO.of(2).map(roll);
const rollD20 = () => d20.run();
const rollD12 = () => d12.run();
const rollD10 = () => d10.run();
const rollD8 = () => d8.run();
const rollD6 = () => d6.run();
const rollD4 = () => d4.run();
const rollD3 = () => d3.run();
const rollD2 = () => d2.run();
export {
  rollD4 as a,
  rollD10 as b,
  rollD20 as c,
  rollD12 as d,
  rollD8 as e,
  rollD6 as f,
  rollD3 as g,
  rollD2 as r
};
