import { c as create_ssr_component, q as createEventDispatcher } from "./index2.js";
import "./index3.js";
const RollButton_svelte_svelte_type_style_lang = "";
const css = {
  code: ".button.svelte-liugxq{box-sizing:border-box;border:none;padding:0;line-height:1;background-color:transparent}",
  map: null
};
const RollButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dice } = $$props;
  createEventDispatcher();
  if ($$props.dice === void 0 && $$bindings.dice && dice !== void 0)
    $$bindings.dice(dice);
  $$result.css.add(css);
  return `<button type="${"button"}" title="${"Roll"}" class="${"button svelte-liugxq"}"><img src="${"/pip-six.svg"}" alt="${"Roll"}"></button>`;
});
export {
  RollButton as R
};
