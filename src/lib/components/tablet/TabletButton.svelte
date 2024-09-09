<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let pulse = false;

    function handleClick() {
        dispatch('click');
    }
</script>


<div class="flex w-full ">
    <button
        on:click={handleClick}
        class="mx-4 my-4 ml-auto w-fit  rounded-full bg-green-500 px-6 py-7 shadow-md hover:shadow-lg">
        <img
            src="/img/icons/mobile-app.png"
            alt=""
            class="h-24 {pulse? "animate-pulse" : ""}" draggable="false" />
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
</style>