import { c as create_ssr_component, f as compute_rest_props, h as spread, i as escape_object, e as escape, j as compute_slots, b as add_attribute, k as escape_attribute_value, d as each, v as validate_component, n as null_to_empty, l as createEventDispatcher, a as subscribe } from "../../../chunks/index2.js";
import { B as Button, g as goto } from "../../../chunks/Button.js";
import { ifElse, lte, gte, always, lt, compose, not, isEmpty, prop, reduce, values } from "ramda";
import { d as derived, w as writable } from "../../../chunks/index.js";
import { t as toDiceString, m as minRoll, a as maxRoll } from "../../../chunks/index3.js";
import { R as RollButton } from "../../../chunks/RollButton.js";
import { r as rollD2, a as rollD4 } from "../../../chunks/dice.js";
import { a as addCharacter } from "../../../chunks/db.js";
const formDataFactory = () => ({
  food: 0,
  silver: 0,
  tableOne: "",
  tableTwo: "",
  tableThree: "",
  weapon: "",
  armor: "",
  agility: 0,
  presence: 0,
  strength: 0,
  toughness: 0,
  hitPoints: 0,
  name: "",
  traits: [],
  brokenBodies: "",
  badHabits: "",
  origin: "",
  classFeature: ""
});
const store = writable({
  selectedClass: {},
  formData: formDataFactory()
});
function setSelectedClass(selectedClass) {
  store.update((state) => {
    const { food, tableOne, tableTwo, tableThree, name } = state.formData;
    const formData = { ...formDataFactory(), food, tableOne, tableTwo, tableThree, name };
    return { selectedClass, formData };
  });
}
const scoreRange = ifElse(lte(-3), gte(3), always(false));
const gtZero = lt(0);
const notEmpty = compose(not, isEmpty);
const canSubmit = derived(
  store,
  ({ formData }) => {
    const VALIDATIONS = [
      ["food", gtZero],
      ["silver", gtZero],
      ["tableOne", notEmpty],
      ["tableTwo", notEmpty],
      ["tableThree", notEmpty],
      ["weapon", notEmpty],
      ["armor", notEmpty],
      ["agility", scoreRange],
      ["presence", scoreRange],
      ["strength", scoreRange],
      ["toughness", scoreRange],
      ["hitPoints", gtZero],
      ["name", notEmpty],
      ["traits", notEmpty],
      ["brokenBodies", notEmpty],
      ["badHabits", notEmpty]
    ];
    return VALIDATIONS.reduce((acc, [key, fn]) => acc && fn(formData[key]), true);
  },
  false
);
const Label_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".label.svelte-nypqz3.svelte-nypqz3{display:block}.label.svelte-nypqz3>div.svelte-nypqz3:first-of-type{display:flex;gap:0.75rem;align-items:center;padding-bottom:var(--padTiny)}.label.svelte-nypqz3>div.svelte-nypqz3:nth-of-type(2){padding-top:var(--padTiny);text-align:right}",
  map: null
};
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title"]);
  let $$slots = compute_slots(slots);
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$4);
  return `<label${spread([{ class: "label" }, escape_object($$restProps)], { classes: "svelte-nypqz3" })}><div class="svelte-nypqz3">${escape(title)} ${slots.roll ? slots.roll({}) : ``}</div>
	${slots.default ? slots.default({}) : ``}
	${$$slots.comments ? `<div class="svelte-nypqz3">${slots.comments ? slots.comments({}) : ``}</div>` : ``}
</label>`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value"]);
  let { value = "" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `

<input${spread([{ type: "text" }, { class: "control" }, escape_object($$restProps)], {})}${add_attribute("value", value, 0)}>

`;
});
const NumberInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value"]);
  let { value = 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<input${spread([{ type: "number" }, { class: "control" }, escape_object($$restProps)], {})}${add_attribute("value", value, 0)}>`;
});
const TriangleDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path d="M4 6H11L7.5 10.5L4 6Z"${add_attribute("fill", color, 0)}></path></svg>`;
});
const TriangleDown$1 = TriangleDown;
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["options", "valueProp", "labelProp", "value"]);
  let { options } = $$props;
  let { valueProp = "_id" } = $$props;
  let { labelProp = "name" } = $$props;
  let { value } = $$props;
  const getVal = prop(valueProp);
  const getLabel = prop(labelProp);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.valueProp === void 0 && $$bindings.valueProp && valueProp !== void 0)
    $$bindings.valueProp(valueProp);
  if ($$props.labelProp === void 0 && $$bindings.labelProp && labelProp !== void 0)
    $$bindings.labelProp(labelProp);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<div class="select-wrapper"><select${spread([{ class: "control select" }, escape_object($$restProps)], {})}>${each(options, (option) => {
    return `<option${add_attribute("value", getVal(option), 0)}>${escape(getLabel(option))}</option>`;
  })}</select>
	${validate_component(TriangleDown$1, "TriangleDown").$$render(
    $$result,
    {
      class: "icon",
      color: "#979797",
      size: 24
    },
    {},
    {}
  )}</div>`;
});
const RollTable_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".wrapper.svelte-r2djon.svelte-r2djon{margin:0 0 1.5rem 0}.title.svelte-r2djon.svelte-r2djon{margin:0}.radio.svelte-r2djon.svelte-r2djon{position:absolute;opacity:0}.list-item.svelte-r2djon.svelte-r2djon{margin:var(--padSmall) 0}.list-item-text.svelte-r2djon.svelte-r2djon{padding:var(--padTiny);line-height:1.33333}.radio.svelte-r2djon:checked+.list-item-text.svelte-r2djon{background-color:var(--yellow)}.radio.svelte-r2djon:disabled+.list-item-text.svelte-r2djon{text-decoration:line-through}.inline-block.svelte-r2djon>li.svelte-r2djon{display:inline-block}.dice.svelte-r2djon.svelte-r2djon{padding-right:0.5em}",
  map: null
};
const RollTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { die } = $$props;
  let { group } = $$props;
  let { options } = $$props;
  let { multiple = 1 } = $$props;
  let { alignItems = "list-item" } = $$props;
  if ($$props.die === void 0 && $$bindings.die && die !== void 0)
    $$bindings.die(die);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.alignItems === void 0 && $$bindings.alignItems && alignItems !== void 0)
    $$bindings.alignItems(alignItems);
  $$result.css.add(css$3);
  group.length >= multiple;
  return `<div class="wrapper svelte-r2djon"><h1 class="title svelte-r2djon">d${escape(die)} ${slots.default ? slots.default({}) : ``}</h1>
	<ol class="${escape(null_to_empty(`clear-list list local ${alignItems}`), true) + " svelte-r2djon"}">${each(options, ({ dice: dice2, label, value }, index) => {
    let isDisabled = !(index < die);
    return `
			<li class="list-item svelte-r2djon"><label>${multiple === 1 ? `<input class="radio svelte-r2djon" type="radio"${add_attribute("value", value, 0)} ${isDisabled ? "disabled" : ""}${value === group ? add_attribute("checked", true, 1) : ""}>` : `${isDisabled && group.indexOf(value) === -1 ? `<input class="radio svelte-r2djon" type="checkbox"${add_attribute("value", value, 0)} ${"disabled"}${~group.indexOf(value) ? add_attribute("checked", true, 1) : ""}>` : `<input class="radio svelte-r2djon" type="checkbox"${add_attribute("value", value, 0)}${~group.indexOf(value) ? add_attribute("checked", true, 1) : ""}>`}`}

					<span class="list-item-text svelte-r2djon"><span class="dice svelte-r2djon">${escape(dice2[0])}${dice2.length > 1 ? `-${escape(dice2[dice2.length - 1])}` : ``}</span>
						<!-- HTML_TAG_START -->${label}<!-- HTML_TAG_END --></span></label>
			</li>`;
  })}</ol>
</div>`;
});
const Score_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".fieldset.svelte-1h1kzup{padding:0;border:none;margin:0}.legend.svelte-1h1kzup{display:flex;gap:0.75em;align-items:center;padding-bottom:0.5em;font-weight:700;font-size:0.875em;letter-spacing:0.02em}",
  map: null
};
const Score = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const dispatch = createEventDispatcher();
  let { ability } = $$props;
  let { mod } = $$props;
  let score = 0;
  let lastScore = -1;
  const send = (score2) => {
    dispatch("change", { key: ability.key, score: score2 });
    lastScore = score2;
  };
  if ($$props.ability === void 0 && $$bindings.ability && ability !== void 0)
    $$bindings.ability(ability);
  if ($$props.mod === void 0 && $$bindings.mod && mod !== void 0)
    $$bindings.mod(mod);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        if (score !== lastScore) {
          send(score);
        }
      }
    }
    $$rendered = `<fieldset class="fieldset svelte-1h1kzup"><legend class="legend svelte-1h1kzup">${escape(`${ability.name}(${toDiceString(ability.dice)})`)}
		${validate_component(RollButton, "RollButton").$$render($$result, { dice: ability.dice }, {}, {})}</legend>
	<div class="row"><div class="col-two">${validate_component(Label, "Label").$$render($$result, { title: "roll" }, {}, {
      default: () => {
        return `${validate_component(NumberInput, "NumberInput").$$render(
          $$result,
          {
            min: minRoll(ability.dice),
            max: maxRoll(ability.dice),
            value: score
          },
          {
            value: ($$value) => {
              score = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })}</div>
		<div class="col-two">${validate_component(Label, "Label").$$render(
      $$result,
      {
        title: "score",
        "aria-labelledby": `${ability.name}-title`
      },
      {},
      {
        default: () => {
          return `${validate_component(NumberInput, "NumberInput").$$render($$result, { readonly: true, value: mod }, {}, {})}`;
        }
      }
    )}</div></div>
</fieldset>`;
  } while (!$$settled);
  return $$rendered;
});
const Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["onSubmit"]);
  let { onSubmit } = $$props;
  if ($$props.onSubmit === void 0 && $$bindings.onSubmit && onSubmit !== void 0)
    $$bindings.onSubmit(onSubmit);
  return `<form${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</form>`;
});
const Title_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".title-wrapper.svelte-199rmv{text-align:right;float:right}.title-wrapper.left.svelte-199rmv{padding-right:1rem;text-align:left;float:left}.h2.svelte-199rmv{margin:0.25em 0 0 0;font:2.75rem/1 var(--handwriting);color:var(--pink)}",
  map: null
};
const Title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { align = "right" } = $$props;
  const rotations = [-3, -2, -1, 1, 2, 3];
  const index = Math.floor(Math.random() * 6);
  const rotation = rotations[index];
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  $$result.css.add(css$1);
  return `<section><div class="${escape(null_to_empty(`title-wrapper ${align}`), true) + " svelte-199rmv"}"><h2 class="h2 svelte-199rmv"${add_attribute("style", `transform: rotate(${rotation}deg)`, 0)}>${each(title.split(/\s/), (word) => {
    return `<!-- HTML_TAG_START -->${word}<!-- HTML_TAG_END --><br>`;
  })}</h2>
		${slots.subtitle ? slots.subtitle({}) : ``}</div>
	${slots.default ? slots.default({}) : ``}
</section>`;
});
const OptionButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dice: dice2 } = $$props;
  let { options } = $$props;
  createEventDispatcher();
  if ($$props.dice === void 0 && $$bindings.dice && dice2 !== void 0)
    $$bindings.dice(dice2);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: dice2 }, {}, {})}`;
});
const dice = Object.freeze({
  "2": rollD2,
  "4": rollD4
});
const safeParse = (s) => {
  try {
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
};
const filterParse = reduce((acc, x) => {
  const p = safeParse(x);
  return p === null ? acc : acc.concat(p.equipment);
}, []);
const sortInto = reduce(
  (acc, val) => {
    if (Array.isArray(val)) {
      acc.description = acc.description.concat(val);
    } else if (val.startsWith('{"equipment"')) {
      acc.equipment = acc.equipment.concat(val);
    } else if (val.startsWith('{"follower"')) {
      acc.followers = acc.followers.concat(val);
    } else {
      acc.description = acc.description.concat(val);
    }
    return acc;
  },
  { equipment: [], followers: [], description: [] }
);
const sort = compose(
  ({ equipment, followers, description }) => ({
    equipment: filterParse(equipment),
    followers: filterParse(followers),
    description
  }),
  sortInto,
  values
);
function formToCharacter({ _id, name: className, omens, naturalWeapon, powers }, { food, silver, agility, presence, strength, toughness, hitPoints, name, ...rest }) {
  const { equipment, followers, description } = sort(rest);
  return {
    name,
    className,
    silver,
    abilities: {
      agility,
      presence,
      strength,
      toughness
    },
    hitpoints: { current: hitPoints, maximum: hitPoints },
    equipment: [
      {
        name: `Waterskin and ${food} day(s) worth of food.`,
        type: "equipment",
        description: "<p>4 days of water.</p>",
        equipped: false,
        price: 4,
        quantity: {
          current: food,
          maximum: 4
        },
        // img: 'systems/morkborg/icons/items/misc/waterskin.png',
        // effects: [],
        _id: "Zrs4ubq4fDBNPmnN"
      },
      ...equipment
    ],
    omens: { current: dice[omens](), maximum: omens },
    // roll
    powers: powers ? dice[4]() + presence : null,
    // roll, but also T/F and not currently in Data
    description,
    followers
  };
}
const newCharacerForm_svelte_svelte_type_style_lang = "";
const css = {
  code: ".banner.svelte-y2j8s{position:fixed;top:32px;left:-63px;padding:0.5em 4rem;border-bottom:1px solid var(--black);transform:rotate(-45deg);background-color:var(--yellow);text-align:center}",
  map: null
};
const New_characer_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  let $canSubmit, $$unsubscribe_canSubmit;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  $$unsubscribe_canSubmit = subscribe(canSubmit, (value) => $canSubmit = value);
  let { tables } = $$props;
  const CHARACTERS = tables.characters;
  let classId = CHARACTERS[0]._id;
  let hpDice = [];
  const handleSubmit = () => addCharacter(formToCharacter($store.selectedClass, $store.formData)).then(() => goto("/"));
  if ($$props.tables === void 0 && $$bindings.tables && tables !== void 0)
    $$bindings.tables(tables);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        let selectedClass = CHARACTERS.find((x) => x._id === classId);
        !!selectedClass && setSelectedClass(selectedClass);
      }
    }
    {
      {
        const D = $store.selectedClass.hitPoints || [1, "d", 1];
        const M = ["+", $store.formData.toughness];
        hpDice = [...D, ...M];
      }
    }
    $$rendered = `<a href="/" class="banner svelte-y2j8s">Go Home!<br>the path is pain.</a>
${validate_component(Form, "Form").$$render($$result, { onSubmit: handleSubmit }, {}, {
      default: () => {
        return `${validate_component(Label, "Label").$$render($$result, { title: "Character Class" }, {}, {
          roll: () => {
            return `${validate_component(OptionButton, "OptionButton").$$render(
              $$result,
              {
                dice: [1, "d", 6, "+", 1],
                options: CHARACTERS,
                slot: "roll"
              },
              {},
              {}
            )}`;
          },
          default: () => {
            return `${validate_component(Select, "Select").$$render(
              $$result,
              { options: CHARACTERS, value: classId },
              {
                value: ($$value) => {
                  classId = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}

	<div class="row"><div class="col-two">${validate_component(Label, "Label").$$render($$result, { title: "d4 days of food" }, {}, {
          roll: () => {
            return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: [1, "d", 4], slot: "roll" }, {}, {})}`;
          },
          default: () => {
            return `${validate_component(NumberInput, "NumberInput").$$render(
              $$result,
              {
                placeholder: "0",
                min: "1",
                max: "4",
                value: $store.formData.food
              },
              {
                value: ($$value) => {
                  $store.formData.food = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}</div>

		<div class="col-two">${validate_component(Label, "Label").$$render(
          $$result,
          {
            title: `${toDiceString($store.selectedClass.silver)} silver`
          },
          {},
          {
            roll: () => {
              return `${validate_component(RollButton, "RollButton").$$render(
                $$result,
                {
                  dice: $store.selectedClass.silver,
                  slot: "roll"
                },
                {},
                {}
              )}`;
            },
            default: () => {
              return `${validate_component(NumberInput, "NumberInput").$$render(
                $$result,
                {
                  placeholder: "0",
                  min: "0",
                  max: maxRoll($store.selectedClass.silver),
                  step: "10",
                  value: $store.formData.silver
                },
                {
                  value: ($$value) => {
                    $store.formData.silver = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          }
        )}</div></div>

	<div class="row"><div class="col-two">${validate_component(RollTable, "RollTable").$$render(
          $$result,
          {
            die: 6,
            options: tables.tableOne.rows,
            group: $store.formData.tableOne
          },
          {
            group: ($$value) => {
              $store.formData.tableOne = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: [1, "d", 6] }, {}, {})}`;
            }
          }
        )}
			${validate_component(RollTable, "RollTable").$$render(
          $$result,
          {
            die: 12,
            options: tables.tableThree.rows,
            group: $store.formData.tableThree
          },
          {
            group: ($$value) => {
              $store.formData.tableThree = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: [1, "d", 12] }, {}, {})}`;
            }
          }
        )}</div>
		<div class="col-two">${validate_component(RollTable, "RollTable").$$render(
          $$result,
          {
            die: 12,
            options: tables.tableTwo.rows,
            group: $store.formData.tableTwo
          },
          {
            group: ($$value) => {
              $store.formData.tableTwo = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: [1, "d", 12] }, {}, {})}`;
            }
          }
        )}
			${validate_component(Title, "Title").$$render($$result, { title: "Weapons" }, {}, {
          default: () => {
            return `${validate_component(RollTable, "RollTable").$$render(
              $$result,
              {
                die: $store.selectedClass.weaponTable,
                options: tables.weaponTable.rows,
                group: $store.formData.weapon
              },
              {
                group: ($$value) => {
                  $store.formData.weapon = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `(${escape($store.selectedClass.weaponTable)})
					${validate_component(RollButton, "RollButton").$$render(
                    $$result,
                    {
                      dice: [1, "d", $store.selectedClass.weaponTable]
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}</div></div>

	${validate_component(Title, "Title").$$render($$result, { title: "Armor" }, {}, {
          default: () => {
            return `${validate_component(RollTable, "RollTable").$$render(
              $$result,
              {
                die: $store.selectedClass.armorTable,
                options: tables.armorTable.rows,
                group: $store.formData.armor
              },
              {
                group: ($$value) => {
                  $store.formData.armor = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(RollButton, "RollButton").$$render(
                    $$result,
                    {
                      dice: [1, "d", $store.selectedClass.armorTable]
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}

	<div class="row"><div class="col-two">${validate_component(Score, "Score").$$render(
          $$result,
          {
            ability: $store.selectedClass.abilities[0],
            mod: $store.formData.agility
          },
          {},
          {}
        )}</div>
		<div class="col-two">${validate_component(Score, "Score").$$render(
          $$result,
          {
            ability: $store.selectedClass.abilities[1],
            mod: $store.formData.presence
          },
          {},
          {}
        )}</div>
		<div class="col-two">${validate_component(Score, "Score").$$render(
          $$result,
          {
            ability: $store.selectedClass.abilities[2],
            mod: $store.formData.strength
          },
          {},
          {}
        )}</div>
		<div class="col-two">${validate_component(Score, "Score").$$render(
          $$result,
          {
            ability: $store.selectedClass.abilities[3],
            mod: $store.formData.toughness
          },
          {},
          {}
        )}</div></div>

	<div class="row"><div class="col-three">${validate_component(Label, "Label").$$render(
          $$result,
          {
            title: `Hit Points (${toDiceString($store.selectedClass.hitPoints)} + toughness(${$store.formData.toughness}))`
          },
          {},
          {
            roll: () => {
              return `${validate_component(RollButton, "RollButton").$$render(
                $$result,
                {
                  dice: [
                    ...$store.selectedClass.hitPoints,
                    "+",
                    $store.formData.toughness
                  ],
                  slot: "roll"
                },
                {},
                {}
              )}`;
            },
            default: () => {
              return `${validate_component(NumberInput, "NumberInput").$$render(
                $$result,
                {
                  placeholder: "0",
                  min: "1",
                  max: maxRoll(hpDice),
                  value: $store.formData.hitPoints
                },
                {
                  value: ($$value) => {
                    $store.formData.hitPoints = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          }
        )}</div></div>

	${validate_component(Title, "Title").$$render($$result, { title: "Terrible Traits" }, {}, {
          subtitle: () => {
            return `<span slot="subtitle">(roll twice)</span>`;
          },
          default: () => {
            return `${validate_component(RollTable, "RollTable").$$render(
              $$result,
              {
                die: 20,
                options: tables.terribelTraits.rows,
                multiple: 2,
                alignItems: "inline-block",
                group: $store.formData.traits
              },
              {
                group: ($$value) => {
                  $store.formData.traits = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: [1, "d", 20] }, {}, {})}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Title, "Title").$$render($$result, { title: "Broken Bodies", align: "left" }, {}, {
          default: () => {
            return `${validate_component(RollTable, "RollTable").$$render(
              $$result,
              {
                die: 20,
                options: tables.brokenBodies.rows,
                alignItems: "inline-block",
                group: $store.formData.brokenBodies
              },
              {
                group: ($$value) => {
                  $store.formData.brokenBodies = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: [1, "d", 20] }, {}, {})}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Title, "Title").$$render($$result, { title: "Bad Habits" }, {}, {
          default: () => {
            return `${validate_component(RollTable, "RollTable").$$render(
              $$result,
              {
                die: 20,
                options: tables.badHabits.rows,
                group: $store.formData.badHabits
              },
              {
                group: ($$value) => {
                  $store.formData.badHabits = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: [1, "d", 20] }, {}, {})}`;
                }
              }
            )}`;
          }
        })}

	${!isEmpty($store.selectedClass.origin) ? `${validate_component(Title, "Title").$$render(
          $$result,
          {
            title: `${$store.selectedClass.origin.title}`
          },
          {},
          {
            default: () => {
              return `${validate_component(RollTable, "RollTable").$$render(
                $$result,
                {
                  die: $store.selectedClass.origin.dice[2],
                  options: $store.selectedClass.origin.rows,
                  group: $store.formData.origin
                },
                {
                  group: ($$value) => {
                    $store.formData.origin = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${validate_component(RollButton, "RollButton").$$render($$result, { dice: $store.selectedClass.origin.dice }, {}, {})}`;
                  }
                }
              )}`;
            }
          }
        )}` : ``}

	
	${!isEmpty($store.selectedClass.classFeature) ? `${validate_component(Title, "Title").$$render($$result, { title: "Class Feature..." }, {}, {
          default: () => {
            return `${validate_component(RollTable, "RollTable").$$render(
              $$result,
              {
                die: $store.selectedClass.classFeature.dice[2],
                options: $store.selectedClass.classFeature.rows,
                group: $store.formData.classFeature
              },
              {
                group: ($$value) => {
                  $store.formData.classFeature = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(RollButton, "RollButton").$$render(
                    $$result,
                    {
                      dice: $store.selectedClass.classFeature.dice
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}` : ``}

	${validate_component(Label, "Label").$$render($$result, { title: "Name this one" }, {}, {
          default: () => {
            return `${validate_component(Input, "Input").$$render(
              $$result,
              { value: $store.formData.name },
              {
                value: ($$value) => {
                  $store.formData.name = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}

	<div class="row row-right"><div style="text-align:right;">… it will not ${validate_component(Button, "Button").$$render($$result, { type: "submit", disabled: !$canSubmit }, {}, {
          default: () => {
            return `Save`;
          }
        })} you
		</div></div>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_store();
  $$unsubscribe_canSubmit();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(New_characer_form, "NewCharacerForm").$$render($$result, { tables: data.tables }, {}, {})}`;
});
export {
  Page as default
};
