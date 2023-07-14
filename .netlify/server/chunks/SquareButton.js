import { c as create_ssr_component, f as compute_rest_props, h as spread, i as escape_object, k as escape_attribute_value, v as validate_component } from "./ssr.js";
import "./index2.js";
const Icons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "plus" } = $$props;
  const ICONS = {
    minus: '<rect id="Rectangle" x="4px" y="9px" width="12" height="2"></rect>',
    plus: '<rect id="Rectangle" x="4px" y="9px" width="12" height="2"></rect><rect id="Rectangle2" transform="rotate(90)" x="4px" y="-11px" width="12" height="2"></rect>',
    play: '<g id="HOME" transform="translate(-223.500000, -14.500000)" fill="#000000"><polygon id="Triangle" transform="translate(234.000000, 25.000000) rotate(-270.000000) translate(-227.000000, -19.500000) " points="227 16 232 23 222 23"></polygon></g>'
  };
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  return `<svg class="svg" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- HTML_TAG_START -->${ICONS[icon]}<!-- HTML_TAG_END --></svg>`;
});
const SquareButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "icon", "color", "href"]);
  let { tag = "button" } = $$props;
  let { icon = "plus" } = $$props;
  let { color = "primary" } = $$props;
  let { href = "" } = $$props;
  const classes = `btn ${color} btn-square`;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `${tag === "button" ? `<button${spread(
    [
      { type: "button" },
      escape_object($$restProps),
      { class: escape_attribute_value(classes) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ` ${validate_component(Icons, "Icons").$$render($$result, { icon }, {}, {})} `}</button>` : `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      { class: escape_attribute_value(classes) }
    ],
    {}
  )}>${validate_component(Icons, "Icons").$$render($$result, { icon }, {}, {})}</a>`}`;
});
export {
  SquareButton as S
};
