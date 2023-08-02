

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.a1ee2e13.js","_app/immutable/chunks/index.fb947ac8.js"];
export const stylesheets = ["_app/immutable/assets/0.89ba0fb5.css"];
export const fonts = [];
