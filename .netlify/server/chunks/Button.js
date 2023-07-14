import { c as create_ssr_component, f as compute_rest_props, h as spread, k as escape_attribute_value, i as escape_object } from "./ssr.js";
function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
const goto = guard("goto");
const invalidateAll = guard("invalidateAll");
const Button_svelte_svelte_type_style_lang = "";
const css = {
  code: ".button.svelte-cypbwp{padding:calc(var(--padSmall) + var(--padTiny));font-weight:700}",
  map: null
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "disabled", "style"]);
  let { type = "button" } = $$props;
  let { disabled = false } = $$props;
  let { style = "primary" } = $$props;
  const classes = `btn button ${style}`;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css);
  return `<button${spread(
    [
      { type: escape_attribute_value(type) },
      { disabled: disabled || null },
      {
        "aria-disabled": escape_attribute_value(disabled)
      },
      escape_object($$restProps),
      { class: escape_attribute_value(classes) }
    ],
    { classes: "svelte-cypbwp" }
  )}>${slots.default ? slots.default({}) : ``} </button>`;
});
export {
  Button as B,
  goto as g,
  invalidateAll as i
};
