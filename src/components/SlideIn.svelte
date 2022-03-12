<script>
    import { afterUpdate, onDestroy } from "svelte";
    export let show = false;
    export let onClose = () => {}

    const handleKeydown = (e) => e.key === "Escape" ? onClose() : null;

    afterUpdate(() => {
        if (show) {
            document.body.addEventListener('keydown', handleKeydown);
        } else {
            document.body.removeEventListener('keydown', handleKeydown);
        }
    })

    onDestroy(() => document.body.removeEventListener('keydown', handleKeydown))
</script>

<div
    class="modal"
    style:transform={show ? 'translate3d(0, 0, 0)' : ''}
>
    <button
        type="button"
        class="close"
        on:click={onClose}
    >
        close
    </button>
    <div class="content">
        <slot></slot>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.3);
        transform: translate3d(100vw, 0, 0);
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }
    .close {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
    }
    .content {
        box-sizing: border-box;
        width: calc(100% - 2rem);
        height: calc(100% - 2rem);
        padding: 1.5rem;
        margin: 1rem;
        background-color: #fff;
        box-shadow: 0.25em 0.25em 0.5em rgb(0 0 0 / 20%);
    }
</style>