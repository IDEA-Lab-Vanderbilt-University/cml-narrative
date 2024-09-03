<!--
 /src/lib/components/activities/survey/SurveyOption.svelte
 SurveyOption.svelte
 cml-narrative
 
 Created by Ian Thompson on August 1st 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	export let emoji: string;
	export let response: string;

	export let selected: boolean = false;

	export const reset = () => {
		selected = false;
	};

	// When the button is clicked, we will set the selected value to true
	let button: HTMLButtonElement | void;
	$: {
		if (button != undefined) {
			button.addEventListener('click', () => {
				selected = true;
			});
		}
	}

	$: {
		if (selected) {
			button?.classList.add('bg-white', 'bg-opacity-10');
		} else {
			button?.classList.remove('bg-white', 'bg-opacity-10');
		}
	}

</script>

<button
	class="flex items-center rounded-md hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-20"
	on:click
	bind:this={button}
	>
	<span class="mr-5 text-5xl">{emoji}</span>{response}
</button>
