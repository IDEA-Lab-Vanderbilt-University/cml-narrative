<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let pulse = false;
    export let disabled = false;

    function handleClick() {
        if (disabled) {
            return;
        }

        dispatch('click');
    }
</script>


<div style="position: absolute; top: 1rem; right: 1rem; z-index: 10;">
    <button
        disabled={disabled}
        on:click={handleClick}
        class="rounded-full bg-green-500 px-6 py-7 shadow-md hover:shadow-lg"
        class:is-disabled={disabled}>
        <img
            src="/img/icons/mobile-app.png"
            alt=""
            class="h-24 {pulse? 'animate-pulse' : ''}" draggable="false" />
    </button>
</div>

<style>
    button {
        transition: all 0.3s;
    }

    button:hover {
        transform: scale(1.05);
    }

    button:active {
        transform: scale(0.95);
    }

    button img {
        user-select: none;
    }

    button.is-disabled {
        background-color: #6b7280;
        cursor: not-allowed;
        opacity: 0.75;
        transform: none;
    }

    button.is-disabled:hover,
    button.is-disabled:active {
        transform: none;
        box-shadow: none;
    }

    div {
        z-index: 100;
        position: relative;
    }
</style>