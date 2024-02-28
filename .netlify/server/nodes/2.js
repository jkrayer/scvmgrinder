import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.3f48c70d.js","_app/immutable/chunks/index.a8a8a3d3.js","_app/immutable/chunks/index.fb947ac8.js","_app/immutable/chunks/Button.104c05c5.js","_app/immutable/chunks/singletons.0b2b7eff.js","_app/immutable/chunks/index.b56d6344.js","_app/immutable/chunks/SquareButton.8c71a2b9.js"];
export const stylesheets = ["_app/immutable/assets/2.c822a0fa.css","_app/immutable/assets/Button.f0b58984.css"];
export const fonts = [];
