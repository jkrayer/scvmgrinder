import { c as create_ssr_component, h as compute_rest_props, j as spread, k as escape_attribute_value, l as escape_object, d as add_attribute, a as subscribe, e as escape, v as validate_component, p as null_to_empty, f as each, q as createEventDispatcher } from "../../../../chunks/index2.js";
import { d as derived, w as writable } from "../../../../chunks/index.js";
import { lens, prop, assoc, view, propEq, has, propSatisfies, either, isNil, equals, compose, lt, pathOr, both, anyPass, allPass, reduce, filter, map, ifElse, isEmpty, always, join, isNotNil, paths, lensPath, propOr, toPairs } from "ramda";
import { u as updateCharacter } from "../../../../chunks/db.js";
import { R as RollButton } from "../../../../chunks/RollButton.js";
import { S as SquareButton } from "../../../../chunks/SquareButton.js";
const ArrowDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "size"]);
  let { color = "currentColor" } = $$props;
  let { size = 15 } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { viewBox: "0 0 15 15" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
});
const ArrowUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "size"]);
  let { color = "currentColor" } = $$props;
  let { size = 15 } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { viewBox: "0 0 15 15" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
});
const Circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "size"]);
  let { color = "currentColor" } = $$props;
  let { size = 15 } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { viewBox: "0 0 15 15" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
});
const CrossCircled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "size"]);
  let { color = "currentColor" } = $$props;
  let { size = 15 } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { viewBox: "0 0 15 15" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
});
const EyeOpen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "size"]);
  let { color = "currentColor" } = $$props;
  let { size = 15 } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { viewBox: "0 0 15 15" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
});
const Trash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "size"]);
  let { color = "currentColor" } = $$props;
  let { size = 15 } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { viewBox: "0 0 15 15" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps)
    ],
    {}
  )}><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
});
const ABILITIES = "abilities";
const AGILITY = "agility";
const EQUIPMENT_KEY = "equipment";
const HP_KEY = "hitpoints";
const STRENGTH = "strength";
const padTo = (size, array) => {
  const difference = size - array.length;
  const tail = difference < 1 ? [] : new Array(difference).fill(null);
  return [...array, ...tail];
};
const QUANTITY = "quantity";
const eqLens = lens(
  prop(EQUIPMENT_KEY),
  assoc(EQUIPMENT_KEY)
);
const getEquipment = view(eqLens);
const dieToDice = (d) => typeof d === "number" ? [1, "d", d] : d;
const numberToMod = (n) => n < 0 ? ["-", Math.abs(n)] : n > 0 ? ["+", n] : [];
const isEquipped = propEq(true, "equipped");
const hasEquippedProp = has("equipped");
const notBroken = propSatisfies(either(isNil, equals(false)), "broken");
const isWeapon = propEq("weapon", "type");
const isArmor = propEq("armor", "type");
const isShield = propEq("shield", "type");
const isArmorOrShield = either(isArmor, isShield);
const trace = (msg) => (x) => {
  console.log(msg, x);
  return x;
};
const hasQuantityProp = has(QUANTITY);
const canIncrement = (a) => pathOr(0, ["quantity", "current"], a) < pathOr(0, ["quantity", "maximum"], a);
const canDecrement = compose(
  trace("canDec"),
  lt(0),
  trace("canDec"),
  pathOr(0, ["quantity", "current"])
);
const isEquippable = both(hasEquippedProp, anyPass([isArmor, isShield, isWeapon]));
const isEquippedWeapon = allPass([isWeapon, isEquipped, notBroken]);
const getMeleeMod = compose(
  numberToMod,
  pathOr(0, [ABILITIES, STRENGTH])
);
const getRangedMod = compose(numberToMod, pathOr(0, [ABILITIES, AGILITY]));
const transformWeapon = (c) => (w) => ({
  ...w,
  damage: dieToDice(w.damageDie),
  toHit: [1, "d", 20, ...w.weaponType === "melee" ? getMeleeMod(c) : getRangedMod(c)]
});
const getEquippedWeapons = (c) => {
  const eq = getEquipment(c);
  const w = filter(isEquippedWeapon, eq);
  return map(transformWeapon(c), w);
};
const isEquippedArmor = allPass([isArmorOrShield, isEquipped, notBroken]);
const equippedArmor = reduce(
  (acc, eq) => {
    if (!isEquippedArmor(eq))
      return acc;
    return { ...acc, [eq.type]: eq };
  },
  { armor: null, shield: null }
);
const getEquippedArmor = compose(equippedArmor, getEquipment);
const D2 = [1, "d", 2];
const D4 = [1, "d", 4];
const D6 = [1, "d", 6];
const ARMOR_TIERS = [[1, "d", 0], D2, D4, D6];
const Character = writable();
Character.subscribe((c) => {
  if (c !== void 0)
    updateCharacter(c);
});
const EquippedWeapons = derived(
  Character,
  getEquippedWeapons
);
const getTitle = compose(
  ifElse(isEmpty, always("no armor"), join("+")),
  filter(isNotNil),
  paths([
    ["armor", "name"],
    ["shield", "name"]
  ])
);
const getFormula = ({ armor, shield }) => {
  const ar = armor !== null ? ARMOR_TIERS[armor.tier?.current || armor.currentTier || 0] : null;
  const s = Number(!!shield);
  return ar === null ? s : s === 0 ? ar : [ar[0], ar[1], ar[2], "+", s];
};
const EquippedArmor = derived(Character, (x) => {
  const armor = getEquippedArmor(x);
  const title = `(${getTitle(armor)})`;
  const formula = getFormula(armor);
  return { armor, title, formula };
});
const Armor_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".armor-formula.svelte-b9giuy{display:flex;align-items:center;justify-content:center;width:70px;height:50px;border:1px solid var(--ruleGray);margin-right:0.625rem}.btn-col.svelte-b9giuy{flex:1 1}.button-tier.svelte-b9giuy{width:30px;height:30px;padding:3px;border-radius:50%;margin-left:var(--padding-tiny);font-size:0.75em;font-weight:700;color:var(--white);background-color:transparent}.active.svelte-b9giuy{color:var(--black);background-color:var(--yellow);cursor:pointer}",
  map: null
};
const Armor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $EquippedArmor, $$unsubscribe_EquippedArmor;
  $$unsubscribe_EquippedArmor = subscribe(EquippedArmor, (value) => $EquippedArmor = value);
  const getTier = (a) => a?.tier?.current || a?.currentTier || 0;
  const getMaxTier = (a) => a?.tier?.maximum || a?.maxTier || 0;
  $$result.css.add(css$7);
  $$unsubscribe_EquippedArmor();
  return `<div class="${"row"}" style="${"align-items:center;"}"><div class="${"col-one"}"><div class="${"row"}"><div class="${"score-title armor-formula svelte-b9giuy"}">${typeof $EquippedArmor.formula === "number" ? `-${escape($EquippedArmor.formula)}` : `-${escape($EquippedArmor.formula.join(""))}`}</div>
			${typeof $EquippedArmor.formula !== "number" ? `${validate_component(RollButton, "RollButton").$$render($$result, { dice: $EquippedArmor.formula }, {}, {})}` : ``}</div></div>

	<div class="${"col-two"}"><div class="${"row"}" style="${"align-items:center;"}"><h2 class="${"sheet-title"}">Armor</h2>
			${escape($EquippedArmor.title)}</div></div>

	<div class="${"col-one"}">${$EquippedArmor.armor !== null ? `<div class="${"row row-right"}"><div class="${"btn-col svelte-b9giuy"}"><button class="${[
    "btn primary button-tier svelte-b9giuy",
    getTier($EquippedArmor.armor.armor) === 1 ? "active" : ""
  ].join(" ").trim()}" ${1 > getMaxTier($EquippedArmor.armor.armor) ? "disabled" : ""} type="${"button"}">1</button></div>
				<div class="${"btn-col svelte-b9giuy"}"><button class="${[
    "btn primary button-tier svelte-b9giuy",
    getTier($EquippedArmor.armor.armor) === 2 ? "active" : ""
  ].join(" ").trim()}" ${2 > getMaxTier($EquippedArmor.armor.armor) ? "disabled" : ""} type="${"button"}">2</button></div>
				<div class="${"btn-col svelte-b9giuy"}"><button class="${[
    "btn primary button-tier svelte-b9giuy",
    getTier($EquippedArmor.armor.armor) === 3 ? "active" : ""
  ].join(" ").trim()}" ${3 > getMaxTier($EquippedArmor.armor.armor) ? "disabled" : ""} type="${"button"}">3</button></div></div>` : ``}</div>
</div>`;
});
lensPath(["quantity", "current"]);
lens(
  propOr(true, "equipped"),
  assoc("equipped")
);
const EquipmentItem_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".inventory-title.svelte-16h5k0w{box-sizing:border-box;position:relative;display:flex;align-items:center;height:27px;padding:0 6px;background-color:var(--veryLightGray);font-size:0.875rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inventory-title-encumbered.svelte-16h5k0w{background-color:var(--lightYellow)}.inventory-is-broken.svelte-16h5k0w{text-decoration:line-through}.buttons.svelte-16h5k0w{position:absolute;display:flex;gap:1px;transform:translate3d(calc(-100% - 6px), 0, 0);transition:all 0.2s ease-in-out}.buttons.active.svelte-16h5k0w{transform:translate3d(0, 0, 0)}",
  map: null
};
const EquipmentItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { eq } = $$props;
  let { encumbered = false } = $$props;
  const classes = `inventory-title ${encumbered ? "inventory-title-encumbered" : ""} ${eq?.broken ? "inventory-is-broken" : ""}`;
  if ($$props.eq === void 0 && $$bindings.eq && eq !== void 0)
    $$bindings.eq(eq);
  if ($$props.encumbered === void 0 && $$bindings.encumbered && encumbered !== void 0)
    $$bindings.encumbered(encumbered);
  $$result.css.add(css$6);
  return `
${eq === null ? `<div class="${escape(null_to_empty(classes), true) + " svelte-16h5k0w"}"></div>` : `<div class="${escape(null_to_empty(classes), true) + " svelte-16h5k0w"}"${add_attribute("title", eq.name, 0)}><div class="${["buttons svelte-16h5k0w", ""].join(" ").trim()}">${validate_component(SquareButton, "SquareButton").$$render($$result, { title: "Details" }, {}, {
    default: () => {
      return `${validate_component(EyeOpen, "EyeOpen").$$render($$result, {}, {}, {})}`;
    }
  })}

			${hasQuantityProp(eq) ? `${validate_component(SquareButton, "SquareButton").$$render($$result, { title: "-1", disabled: !canDecrement(eq) }, {}, {
    default: () => {
      return `${validate_component(ArrowDown, "ArrowDown").$$render($$result, {}, {}, {})}`;
    }
  })}
				${validate_component(SquareButton, "SquareButton").$$render($$result, { title: "+1", disabled: !canIncrement(eq) }, {}, {
    default: () => {
      return `${validate_component(ArrowUp, "ArrowUp").$$render($$result, {}, {}, {})}`;
    }
  })}` : ``}

			${isEquippable(eq) ? (() => {
    let title = eq.equipped ? "Un-Equip" : "Equip";
    return `

				${validate_component(SquareButton, "SquareButton").$$render($$result, { title }, {}, {
      default: () => {
        return `${eq.equipped ? `${validate_component(CrossCircled, "CrossCircled").$$render($$result, {}, {}, {})}` : `${validate_component(Circle, "Circle").$$render($$result, {}, {}, {})}`}`;
      }
    })}`;
  })() : ``}

			${validate_component(SquareButton, "SquareButton").$$render($$result, { title: "Drop" }, {}, {
    default: () => {
      return `${validate_component(Trash, "Trash").$$render($$result, {}, {}, {})}`;
    }
  })}</div>
		<div class="${["copy", ""].join(" ").trim()}">${escape(eq.name)}</div></div>`}`;
});
const Equipment_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "#equipment.svelte-1jun86g.svelte-1jun86g{margin-bottom:var(--pad)}#equipment.svelte-1jun86g>.row.svelte-1jun86g{margin-bottom:var(--padSmall)}#equipment.svelte-1jun86g>ul.svelte-1jun86g{margin-bottom:0}.rule.svelte-1jun86g.svelte-1jun86g{margin:0;font-size:0.75rem;color:var(--gray)}.inventory-list.svelte-1jun86g.svelte-1jun86g{display:flex;flex-wrap:wrap;align-items:stretch}.inventory-slot.svelte-1jun86g.svelte-1jun86g{box-sizing:border-box;flex:0 0 50%;width:50%;padding:1px}.silver.svelte-1jun86g.svelte-1jun86g{margin:var(--padTiny) 0 0 0;font-size:0.875rem}.silver.svelte-1jun86g>span.svelte-1jun86g{font-weight:700}",
  map: null
};
const Equipment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $CharacterStore, $$unsubscribe_CharacterStore;
  $$unsubscribe_CharacterStore = subscribe(Character, (value) => $CharacterStore = value);
  let inventory = padTo(16, $CharacterStore.equipment);
  let encumbrance = 8;
  let encumbranceIndex = 7;
  $$result.css.add(css$5);
  {
    {
      encumbrance = 8 + $CharacterStore.abilities.strength;
      encumbranceIndex = encumbrance - 1;
      $CharacterStore.equipment.length > encumbrance;
      inventory = padTo(16, $CharacterStore.equipment);
    }
  }
  $$unsubscribe_CharacterStore();
  return `<div id="${"equipment"}" class="${"svelte-1jun86g"}"><div class="${"row svelte-1jun86g"}"><h2 class="${"sheet-title col-two"}">Equipment</h2>
		
		<p class="${"rule col-two svelte-1jun86g"}">Strength + 8 items or DR+2 on Agility<wbr>/<wbr>Strength tests</p></div>
	<ul class="${"inventory-list clear-list svelte-1jun86g"}">${each(inventory, (eq, index) => {
    return `<li class="${"inventory-slot svelte-1jun86g"}">${validate_component(EquipmentItem, "EquipmentItem").$$render($$result, { eq, encumbered: index > encumbranceIndex }, {}, {})}
			</li>`;
  })}</ul>
	<p class="${"silver svelte-1jun86g"}"><span class="${"svelte-1jun86g"}">Silver:</span> ${escape($CharacterStore.silver)}</p>
</div>`;
});
const Features_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".prefix.svelte-1s7su8k{font-weight:700;text-transform:capitalize}",
  map: null
};
const Features = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Character, $$unsubscribe_Character;
  $$unsubscribe_Character = subscribe(Character, (value) => $Character = value);
  $$result.css.add(css$4);
  $$unsubscribe_Character();
  return `<h2 class="${"sheet-title"}">Features</h2>
<ul class="${"clear-list row"}">${each($Character.description, (d) => {
    return `<li class="${"col-two"}">${d.indexOf(":") > -1 ? (() => {
      let m = d.split(":");
      return `
				<span class="${"prefix svelte-1s7su8k"}">${escape(m[0])}:</span>
				${escape(m[1])}`;
    })() : `${escape(d)}`}
		</li>`;
  })}
</ul>`;
});
lens(prop(HP_KEY), assoc(HP_KEY));
const toDiceString = join("");
const Header_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".label.svelte-1pn764p{font:700 0.75rem/1 var(--sans-serif);color:var(---black)}.title.svelte-1pn764p{margin:8px 0 0 0;font:400 1rem/1 var(--sans-serif);color:var(---black)}.label.svelte-1pn764p,.title.svelte-1pn764p{padding-left:0.625rem}.hp-row.svelte-1pn764p{justify-content:space-between}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $CharacterStore, $$unsubscribe_CharacterStore;
  $$unsubscribe_CharacterStore = subscribe(Character, (value) => $CharacterStore = value);
  $$result.css.add(css$3);
  $$unsubscribe_CharacterStore();
  return `<header id="${"character-sheet-header"}" class="${"row"}"><div class="${"col-one"}"><div class="${"label svelte-1pn764p"}">Name</div>
		<h1 class="${"title svelte-1pn764p"}">${escape($CharacterStore.name)}</h1></div>
	<div class="${"col-two"}"><div class="${"label svelte-1pn764p"}">Class</div>
		<h2 class="${"title svelte-1pn764p"}">${escape($CharacterStore.className)}</h2></div>
	<div class="${"col-one row hp-row svelte-1pn764p"}"><div><div class="${"label svelte-1pn764p"}">Hit Points</div>
			<p class="${"title svelte-1pn764p"}">${escape($CharacterStore.hitpoints.current)}/${escape($CharacterStore.hitpoints.maximum)}</p></div>
		<div class="${"button-col"}">${validate_component(SquareButton, "SquareButton").$$render($$result, { icon: "plus" }, {}, {})}
			${validate_component(SquareButton, "SquareButton").$$render($$result, { color: "secondary", icon: "minus" }, {}, {})}</div></div>
</header>`;
});
const Power_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".local-row.svelte-14f815r{display:flex;align-items:center}.local-col.svelte-14f815r{flex:1 1}.words.svelte-14f815r{font-size:0.875rem}.button.svelte-14f815r{padding:var(--padTiny) var(--padSmall);font-size:0.875em}",
  map: null
};
const Power = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { body } = $$props;
  let { title } = $$props;
  let { uses = 0 } = $$props;
  createEventDispatcher();
  if ($$props.body === void 0 && $$bindings.body && body !== void 0)
    $$bindings.body(body);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.uses === void 0 && $$bindings.uses && uses !== void 0)
    $$bindings.uses(uses);
  $$result.css.add(css$2);
  return `<div class="${"local-row svelte-14f815r"}"><div class="${"local-col svelte-14f815r"}"><div class="${"local-row svelte-14f815r"}"><h2 class="${"sheet-title"}">${escape(title)} </h2>
			<span class="${"words svelte-14f815r"}">(${escape(uses)})</span></div></div>
	<div class="${"local-col svelte-14f815r"}"><div class="${"local-row row-right svelte-14f815r"}"><button class="${"btn primary button svelte-14f815r"}" ${uses === 0 ? "disabled" : ""}>use</button></div></div></div>
<p class="${"words svelte-14f815r"}">${escape(body)}</p>`;
});
const Omens = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Character, $$unsubscribe_Character;
  $$unsubscribe_Character = subscribe(Character, (value) => $Character = value);
  $$unsubscribe_Character();
  return `${validate_component(Power, "Power").$$render(
    $$result,
    {
      title: "Omens",
      body: "(d4/day) Maximum damage, Reroll, -d6 damage, DR -4, No Crit/Fumble",
      uses: $Character.omens.current
    },
    {},
    {}
  )}`;
});
const Powers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Character, $$unsubscribe_Character;
  $$unsubscribe_Character = subscribe(Character, (value) => $Character = value);
  $$unsubscribe_Character();
  return `${validate_component(Power, "Power").$$render(
    $$result,
    {
      title: "Powers",
      body: "(d4+Presence/day) Presence DR12, or -d2 HP and no Powers for 1 hr.",
      uses: $Character.powers || 0
    },
    {},
    {}
  )}`;
});
const AbilityScores_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".clear-button.svelte-r7mg46{display:block;width:100%;padding:0;border:none;margin:0;background-color:transparent;appearance:none;cursor:pointer}.scores.svelte-r7mg46{border-top:1px solid var(--ruleGray);border-bottom:1px solid var(--ruleGray)}.score-title.svelte-r7mg46,.score.svelte-r7mg46{margin-top:0.25rem;margin-bottom:0;color:var(--gray);text-align:center}.score.svelte-r7mg46{margin-bottom:0.25rem}",
  map: null
};
const AbilityScores = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $CharacterStore, $$unsubscribe_CharacterStore;
  $$unsubscribe_CharacterStore = subscribe(Character, (value) => $CharacterStore = value);
  $$result.css.add(css$1);
  $$unsubscribe_CharacterStore();
  return `<div class="${"row scores svelte-r7mg46"}">${each(toPairs($CharacterStore.abilities), ([key, value]) => {
    return `<div class="${"col-one"}"><button type="${"button"}" class="${"clear-button svelte-r7mg46"}"><h3 class="${"score-title svelte-r7mg46"}">${escape(key)}</h3>
				<p class="${"score-title score svelte-r7mg46"}">${escape(value)}</p></button>
		</div>`;
  })}
</div>`;
});
const Weapons_svelte_svelte_type_style_lang = "";
const css = {
  code: ".weapon-row.svelte-1qr1zos.svelte-1qr1zos{display:flex;align-items:center;justify-content:center;padding-bottom:0.625rem;border-bottom:1px solid var(--ruleGray)}.weapon-row.svelte-1qr1zos>.weapon-row.svelte-1qr1zos{padding-bottom:0;border-bottom:none}",
  map: null
};
const Weapons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $EquippedWeapons, $$unsubscribe_EquippedWeapons;
  $$unsubscribe_EquippedWeapons = subscribe(EquippedWeapons, (value) => $EquippedWeapons = value);
  $$result.css.add(css);
  $$unsubscribe_EquippedWeapons();
  return `${each($EquippedWeapons, (weapon) => {
    return `<div class="${"row weapon-row svelte-1qr1zos"}"><h2 class="${"col-two sheet-title"}">${escape(weapon.name)}</h2>
		<div class="${"col-one weapon-row svelte-1qr1zos"}">${escape(toDiceString(weapon.toHit))} 
			${validate_component(RollButton, "RollButton").$$render($$result, { dice: weapon.toHit }, {}, {})}</div>
		<div class="${"col-one weapon-row svelte-1qr1zos"}">${escape(toDiceString(weapon.damage))} 
			${validate_component(RollButton, "RollButton").$$render($$result, { dice: weapon.damage }, {}, {})}</div>
	</div>`;
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $CharacterStore, $$unsubscribe_CharacterStore;
  $$unsubscribe_CharacterStore = subscribe(Character, (value) => $CharacterStore = value);
  let { data } = $$props;
  Character.set(data.character);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_CharacterStore();
  return `${$CharacterStore === void 0 ? `wating...` : `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
	${validate_component(AbilityScores, "Scores").$$render($$result, {}, {}, {})}
	${validate_component(Weapons, "Weapons").$$render($$result, {}, {}, {})}
	${validate_component(Armor, "Armor").$$render($$result, {}, {}, {})}
	<div class="${"row"}"><div class="${"col-two"}">${validate_component(Powers, "Powers").$$render($$result, {}, {}, {})}</div>
		<div class="${"col-two"}">${validate_component(Omens, "Omens").$$render($$result, {}, {}, {})}</div></div>
	${validate_component(Equipment, "Equipment").$$render($$result, {}, {}, {})}
	${validate_component(Features, "Features").$$render($$result, {}, {}, {})}`}`;
});
export {
  Page as default
};