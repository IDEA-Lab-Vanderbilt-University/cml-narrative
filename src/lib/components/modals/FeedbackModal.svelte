<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let message: string;
	export let isSuccess: boolean;

	const getStatus = () => {
		return isSuccess ? 'Success' : 'Failed';
	};

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	onMount(() => {
		setTimeout(close, 3000);
	});
</script>

<!-- <div
	class="flex h-full items-center justify-center"
	in:fly={{ y: 200, duration: 1000 }}
	out:fly={{ y: 200, duration: 1000 }}>
	<div
		class="flex w-fit flex-col items-center justify-center space-y-12 rounded-lg bg-blue-700 px-12 py-6 text-white shadow-2xl drop-shadow-2xl">
        <button class="absolute top-0 right-0 mx-4 my-0 text-2xl" on:click={close}>×</button>
        {#if isSuccess}
            <div class="border-y-2 border-dashed border-yellow-500 text-green-600 text-2xl py-7">
                {getStatus()}: {message}
            </div>
        {:else}
            <div class="border-y-2 border-dashed border-yellow-500 text-red-600 text-2xl py-7">
                {getStatus()}: {message}
            </div>
        {/if}
	</div>
</div> -->

<div
	id="popup-modal"
	tabindex="-1"
	class="flex h-full items-center justify-center"
	in:fly={{ y: 200, duration: 1000 }}
	out:fly={{ y: 200, duration: 1000 }}>
	>
	<div class="relative max-h-full w-full max-w-md p-4">
		<div class="relative rounded-lg bg-blue-800 shadow">
			<button
				type="button"
				class="items-center absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 justify-center rounded-lg bg-transparent text-sm text-gray-400"
				on:click={close}>
				<svg
					class="h-3 w-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
				</svg>
			</button>
			<div class="p-4 text-center md:p-5">
				{#if isSuccess}
					<svg
						class="mx-auto mb-4 mt-6 h-12 w-12 text-gray-400 dark:text-gray-200"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							fill="#16a34a"
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
					<h3 class="mb-5 text-lg font-normal text-green-600">{message}</h3>
				{:else}
					<svg
						class="mx-auto mb-4 mt-6 h-12 w-12 text-gray-400 dark:text-gray-200"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							fill="#dc2626"
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>

					<h3 class="mb-5 text-lg font-normal text-red-600">{message}</h3>
				{/if}
			</div>
		</div>
	</div>
</div>
