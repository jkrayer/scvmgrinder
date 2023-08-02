import * as universal from '../entries/pages/create/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/create/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/create/+page.ts";
export const imports = ["_app/immutable/nodes/3.02e6d141.js","_app/immutable/chunks/index.a8a8a3d3.js","_app/immutable/chunks/RollButton.66a29d98.js","_app/immutable/chunks/index.fb947ac8.js","_app/immutable/chunks/Button.104c05c5.js","_app/immutable/chunks/singletons.0b2b7eff.js","_app/immutable/chunks/index.b56d6344.js"];
export const stylesheets = ["_app/immutable/assets/3.cb6f1a0c.css","_app/immutable/assets/RollButton.50e3354c.css","_app/immutable/assets/Button.f0b58984.css"];
export const fonts = [];
