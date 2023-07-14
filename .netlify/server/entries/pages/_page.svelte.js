import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape, d as each } from "../../chunks/ssr.js";
import { B as Button, i as invalidateAll } from "../../chunks/Button.js";
import { d as deleteCharacter } from "../../chunks/db.js";
import { S as SquareButton } from "../../chunks/SquareButton.js";
const Confirm_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".dialog.svelte-bndhka{border:1px solid var(--midGray);box-shadow:5px 5px 5px rgba(0, 0, 0, 0.2)}.dialog.svelte-bndhka::backdrop{background-color:rgba(0, 0, 0, 0.2)}.button-row.svelte-bndhka{margin-top:2rem;text-align:right}",
  map: null
};
const Confirm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onClick } = $$props;
  let dialog;
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  $$result.css.add(css$2);
  return `<dialog class="dialog svelte-bndhka"${add_attribute("this", dialog, 0)}><p>${slots.message ? slots.message({}) : `Are you sure?`}</p> <div class="button-row svelte-bndhka">${validate_component(Button, "Button").$$render($$result, { type: "button", style: "muted" }, {}, {
    default: () => {
      return `Cancel`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { type: "button" }, {}, {
    default: () => {
      return `Comfirm`;
    }
  })}</div></dialog> <span>${slots.default ? slots.default({}) : ``} </span>`;
});
const CharacterListItem_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".cli-row.svelte-105vvpj{flex-wrap:nowrap;align-items:center}.figure.svelte-105vvpj{margin:0}.heading.svelte-105vvpj,.class-name.svelte-105vvpj{margin:0}.heading.svelte-105vvpj{font:2rem/1 var(--handwriting);color:var(--gray)}.title-col.svelte-105vvpj{box-sizing:border-box;flex-grow:1;padding:0 0.625rem}",
  map: null
};
const CharacterListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { character } = $$props;
  const image = `/${character.className.toLocaleLowerCase().replace(/\s+/g, "_")}.png`;
  const handleConfirm = () => {
    deleteCharacter(character).then(() => {
      invalidateAll();
    });
  };
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  $$result.css.add(css$1);
  return `<article class="row cli-row svelte-105vvpj"><figure class="figure svelte-105vvpj"><img${add_attribute("src", image, 0)} width="40" height="40"${add_attribute("alt", character.className, 0)}></figure> <div class="title-col svelte-105vvpj"><header><h1 class="heading svelte-105vvpj">${escape(character.name)}</h1></header> <p class="class-name svelte-105vvpj">${escape(character.className)}</p></div> <div class="button-col">${validate_component(SquareButton, "SquareButton").$$render(
    $$result,
    {
      tag: "a",
      href: `/play/${character._id}`,
      icon: "play",
      title: `Play ${character.name}`
    },
    {},
    {}
  )} ${validate_component(Confirm, "Confirm").$$render($$result, { onClick: handleConfirm }, {}, {
    message: () => {
      return `<span slot="message">Cast <span class="heading svelte-105vvpj">${escape(character.name)}</span> into oblivion?<br>(press
				<span class="heading svelte-105vvpj" data-svelte-h="svelte-z115vc">escape</span> to save this soul)</span>`;
    },
    default: () => {
      return `${validate_component(SquareButton, "SquareButton").$$render(
        $$result,
        {
          color: "secondary",
          icon: "minus",
          title: `Delete ${character.name}`
        },
        {},
        {}
      )}`;
    }
  })}</div> </article>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#create-character-link.svelte-3ova0o,#create-character-link.svelte-3ova0o:hover,#create-character-link.svelte-3ova0o:visited{font:2rem/1 var(--handwriting);color:var(--gray);text-decoration:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<ol id="class-list" class="clear-list row"><li class="col-two" data-svelte-h="svelte-w68iz7"><a href="/create" id="create-character-link" class="svelte-3ova0o">+New Character</a></li> ${each(data.characters, (character) => {
    return `<li class="col-two">${validate_component(CharacterListItem, "CharacterListItem").$$render($$result, { character }, {}, {})}</li>`;
  })} </ol>`;
});
export {
  Page as default
};
