import { c as create_ssr_component } from "../../chunks/index2.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "#site-header.svelte-435mw1.svelte-435mw1{margin-bottom:1.25rem;text-align:center}#site-logo.svelte-435mw1.svelte-435mw1{font:400 1.125rem/1 var(--serif);letter-spacing:4px}#site-logo.svelte-435mw1>a.svelte-435mw1{color:var(--gray);text-decoration:none}#site-tag.svelte-435mw1.svelte-435mw1,#site-footer.svelte-435mw1.svelte-435mw1{font:400 0.875rem/1.3333 var(--fixed);color:var(--gray)}#site-tag.svelte-435mw1.svelte-435mw1{margin-top:0.625rem;margin-bottom:0.625rem}#site-footer.svelte-435mw1.svelte-435mw1{margin-top:2.5rem;margin-bottom:1.25rem;text-align:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header id="${"site-header"}" class="${"svelte-435mw1"}"><h1 id="${"site-logo"}" class="${"svelte-435mw1"}"><a href="${"/"}" class="${"svelte-435mw1"}">SCVUMGRINDER</a></h1>
	<p id="${"site-tag"}" class="${"svelte-435mw1"}">A digital character sheet for MÖRK BORG</p>
	<img src="${"/CompWith_MORKBORG_horiz.svg"}" width="${"270"}" height="${"77"}" alt="${"Compatible With MÖRK BORG"}"></header>

<main class="${"narrow-container"}">${slots.default ? slots.default({}) : ``}</main>

<footer id="${"site-footer"}" class="${"narrow-container svelte-435mw1"}"><p>Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult
		Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.
	</p>
	<p><a href="${"https://morkborg.com/"}">MÖRK BORG</a> is copyright Ockult Örtmästare Games and
		<a href="${"https://www.stockholmkartell.com/"}">Stockholm Kartell</a>.
	</p>
	<p><a href="${"https://github.com/jkrayer/scvmgrinder"}">GitHub</a> |
		<a href="${"https://morkborg.com/"}">MÖRK BORG</a></p>
	<p>v0.1.0</p>
</footer>`;
});
export {
  Layout as default
};
