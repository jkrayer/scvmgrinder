<script lang="ts">
	type IconTypes = 'plus' | 'minus' | 'play';

	export let icon: IconTypes = 'plus';

	const ICONS: { [key in IconTypes]: string } = {
		minus: '<rect id="Rectangle" x="4px" y="9px" width="12" height="2"></rect>',
		plus: '<rect id="Rectangle" x="4px" y="9px" width="12" height="2"></rect><rect id="Rectangle2" transform="rotate(90)" x="4px" y="-11px" width="12" height="2"></rect>',
		play: '<g id="HOME" transform="translate(-223.500000, -14.500000)" fill="#000000"><polygon id="Triangle" transform="translate(234.000000, 25.000000) rotate(-270.000000) translate(-227.000000, -19.500000) " points="227 16 232 23 222 23"></polygon></g>'
	};
</script>

<svg
	class="svg"
	width="20px"
	height="20px"
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	{@html ICONS[icon]}
</svg>
