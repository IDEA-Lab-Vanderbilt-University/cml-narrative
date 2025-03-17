<script lang="ts">
	export let step: number;
	export let classes: string[] = [];
	export let trainingSets: string[][] = [];

	let className = '';
	const addClass = () => {
		if (className === '') {
			alert('Please enter a class name');
			return;
		}
		if (classes.includes(className)) {
			alert('Class already exists');
			return;
		}
		classes = [...classes, className];
		className = '';
	};

	const deleteClass = (name: string) => {
		if (confirm('Are you sure you want to delete this category?')) {
			classes = classes.filter((cls) => cls !== name);
		}
	};
</script>

<div class="justify-top my-5 flex h-2/3 w-full flex-col items-center space-y-10 overflow-y-scroll">
	<h2 class="my-2 text-center text-5xl font-bold tracking-wider text-white">
		What kind of things will your model recognize?
	</h2>

	<div class="items-left justify-left mt-8 flex w-1/2 flex-row flex-wrap">
		{#each classes as cls}
			<div class="m-2 flex items-center space-x-3 rounded-xl bg-gray-100 p-3 shadow">
				<t>{cls}</t>
				<button class="btn btn-outline btn-error btn-xs h-1" on:click={() => deleteClass(cls)}
					>x</button>
			</div>
		{/each}
	</div>

	<div class="mt-8 flex flex-row items-center justify-center space-x-4 space-y-4">
		<input
			type="text"
			class="input-primary mt-4 w-60 rounded-md bg-white px-4 py-3 text-center shadow-md"
			placeholder="New Category"
			bind:value={className} />
		<div class="ml-auto">
			<button class="btn btn-primary" on:click={addClass}>Add</button>
		</div>
	</div>

	<button
		on:click={() => {
			if (classes.length < 2) {
				alert('You need to add at least 2 categories');
				return;
			}
			trainingSets = Array(classes.length).fill([]);
			// goto('/traininator?page=4');
			step++;
		}}
		class="my-5 mt-10 flex items-center justify-center gap-5 rounded-full border-2 border-white bg-blue-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
		<p class="mx-5 text-xl font-bold text-gray-800">Next</p>
	</button>
</div>
