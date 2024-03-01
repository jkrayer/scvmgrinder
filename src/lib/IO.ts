/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export const IO = (run) => ({
	run,
	map: (f) => IO(() => f(run())),
	insert: (f) => IO(() => run(f())),
	chain: (f) => IO(() => f(run()).run()), // when f returns an IO
	concat: (other) => IO(() => run().concat(other.run())) // when run() returns an IO
});
IO.of = (x) => IO(() => x);
