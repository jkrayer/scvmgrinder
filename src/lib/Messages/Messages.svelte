<script lang="ts">
	import Messages, { hide } from './state/store';

	// const rollTypeClass = (x: string): string => x.toLocaleLowerCase().replace(/\s/g, '-');
</script>

<div id="messages">
	{#each $Messages as message, index}
		{#if index === 0}
			<div class="message-body" on:click={() => hide(index)}>
				<div class="message-body-title">
					<span>{message.name}<!-- : --></span>
					<!-- <span class={`message-body-title_${rollTypeClass(message.rollType)}`}
						>{message.rollType}</span
					> -->
				</div>
				<div class="message-body-roll-row">
					<div class="message-body-roll">{message.roll}</div>
					<div class="message-body-formula">
						(
						{message.rollFormula}
						{#if message.dc}
							vs {message.dc}
						{/if}
						)
					</div>
				</div>

				<!-- <div class="message-body-target">{message.target}</div> -->
				<!-- : Hit! -->
			</div>
		{:else}
			<div class="message-body" on:click={() => hide(index)}>
				<div class="message-body-title">
					<span>{message.name}:</span>
					{message.roll}
				</div>
			</div>
		{/if}
	{/each}
</div>

<!--  -->
<style>
	#messages {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		z-index: 1;
		display: flex;
		flex-direction: column-reverse;
		width: 30ex;
	}
	.message-body {
		padding: 1rem;
		border-radius: 0.25rem;
		margin-top: 0.5rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: 0.05em;
		background-color: #303030;
	}

	.message-body-title,
	.message-body-formula,
	.message-body-target {
		font-size: 0.8125rem;
		line-height: 1;
		text-transform: capitalize;
	}
	.message-body-title {
		text-transform: uppercase;
	}
	.message-body-title_to-hit {
		color: #769eff;
	}
	.message-body-title_damage {
		color: red;
	}
	.message-body-title_test {
		color: green;
	}

	.message-body-formula,
	.message-body-target {
		color: #ccc;
	}
	.message-body-target {
		line-height: 1.33333;
	}
	.message-body-formula {
		margin-left: 0.25rem;
		font-weight: 400;
	}
	.message-body-roll {
		padding: 0.125em 0;
		font-size: 1.5rem;
	}
	.message-body-roll-row {
		display: flex;
		align-items: center;
	}
</style>
