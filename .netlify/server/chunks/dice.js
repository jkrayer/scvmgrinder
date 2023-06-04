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
IO.of(20).map(roll);
IO.of(12).map(roll);
const d10 = IO.of(10).map(roll);
IO.of(8).map(roll);
IO.of(6).map(roll);
const d4 = IO.of(4).map(roll);
const d2 = IO.of(2).map(roll);
const rollD10 = () => d10.run();
const rollD4 = () => d4.run();
const rollD2 = () => d2.run();
export {
  rollD4 as a,
  rollD10 as b,
  rollD2 as r
};
