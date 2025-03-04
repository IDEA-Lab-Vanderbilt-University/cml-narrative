<script lang="ts">
	import { goto } from '$app/navigation';
	import PizzaDialogBox from '$lib/components/activities/pizza-time/PizzaDialogBox.svelte';
	import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';
	import type { PizzaConfig } from '$lib/components/activities/pizza-time/pizzatypes.js';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import script from '$lib/scripts/level1/pizza-time/index.js';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import DataService from '$lib/utils/DataService/index.js';
	import { pizzaConfigStore, studentProgressStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';

	export let data;

	const dispatch = createEventDispatcher();

	let line: Line;

	$: line = data.line;
	$: lineNumber = data.lineNumber;

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event: any) => {
		var state: NavigationDirection = event.detail.state;

		handleNavigation(state);
	};

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
		let target = '';

		if (direction == NavigationDirection.forward) {
			if (line.id >= script.lines.length) {
				pizzaConfigStore.set(pizza);
				
				DataService.TravelLog.submitTravelLog({
					description: 'pizza-time',
					data: JSON.stringify(pizza),
					status: 'complete'
				});

                // Next level
				target = '/level1/pizza-algorithm?page=1';
			} else {
				goto(`/level1/pizza-time?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			goto(`/level1/pizza-time?page=${line.id - 1}`);
		} else if (direction == NavigationDirection.backward && line.id == 1) {
			goto(`/level1?page=14`);
		}

		// Only update the last visited at the end of the sequence (so if they didn't save their pizza they go back to the start)
		if (target) {
			studentProgressStore.update((data) => {
				data.last_visited = target;
				return data;
			});
			goto(target);
		}
	};

	let noDialogueLine: Line = {
		id: 0,
		audio: '',
		dialog: '',
		speakers: [],
		avatars: [],
		background: '',
	};

	$: {
		noDialogueLine = {...line, dialog: '', avatars: [], speakers: ['']};
	}

	let pizza: PizzaConfig = {
		crust: 'thin',
		sauce: null,
		cheese: false,
		meats: [],
		veggies: [],
		finishingTouches: []
	};

	let pizzaDisplay: PizzaDisplay | void;

	let content: HTMLElement | void;
</script>

<Scene background="/img/backgrounds/level1/16596.png" audio={line.audio}>
	<div id="dialogue" slot="dialog">
		{#if lineNumber < 3 || lineNumber > 8}
			<PizzaDialogBox {line} on:dialogEvent={handleDialogEvent} />
		{:else}
			<PizzaDialogBox line={noDialogueLine} on:dialogEvent={handleDialogEvent} />

			<div id="pizzaChoices">
				{#if lineNumber == 3}
				<div id="pizzaChoiceHeader">Choose your crust!</div>
				<div id="pizzaChoiceButtons">
					<button on:click={() => pizza.crust = 'thin'}>
						<img src="/img/pizzaparts/thincrust.svg" alt="Thin" />
						Thin
					</button>
					<button on:click={() => pizza.crust = 'thick'}>
						<img src="/img/pizzaparts/thickcrust.svg" alt="Thick" />
						Thick
					</button>
					<button on:click={() => pizza.crust = 'cauliflower'}>
						<img src="/img/pizzaparts/cauliflowercrust.svg" alt="Cauliflower" />
						Cauliflower
					</button>
				</div>
				{/if}
				{#if lineNumber == 4}
				<div id="pizzaChoiceHeader">Choose your sauce!</div>
				<div id="pizzaChoiceButtons">
					<button on:click={() => pizza.sauce = 'alfredo'}>
						<img src="/img/pizzaparts/alfredo.svg" alt="Alfredo" />
						Alfredo
					</button>
					<button on:click={() => pizza.sauce = 'marinara'}>
						<img src="/img/pizzaparts/marinara.svg" alt="Marinara" />
						Marinara
					</button>
					<button on:click={() => pizza.sauce = 'bbq'}>
						<img src="/img/pizzaparts/bbq.svg" alt="BBQ" />
						BBQ
					</button>
					<button on:click={() => pizza.sauce = 'spicy'}>
						<img src="/img/pizzaparts/spicy.svg" alt="Spicy" />
						Spicy
					</button>
				</div>
				
				{/if}
				{#if lineNumber == 5}
					<div id="pizzaChoiceHeader">Add cheese?</div>
					<div id="pizzaChoiceButtons">
						<button on:click={() => pizza.cheese = true}>
							<img src="/img/pizzaparts/cheese.svg" alt="Cheese" />
							Yes
						</button>
						<button on:click={() => pizza.cheese = false}>
							<img src="/img/misc/no.svg" alt="No Cheese" />
							No
						</button>
					</div>
				{/if}
				{#if lineNumber == 6}
					<div id="pizzaChoiceHeader">Choose your meats!</div>
					<div id="pizzaChoiceButtons">
						<button on:click={() => {
							if (pizza.meats.includes('pepperoni')) {
								return;
							}

							pizza.meats = [...pizza.meats, 'pepperoni'];
						}}>
							<img src="/img/pizzaparts/pepperoni.svg" alt="Pepperoni" />
							Pepperoni
						</button>
						<button on:click={() => {
							if (pizza.meats.includes('shrimp')) {
								return;
							}

							pizza.meats = [...pizza.meats, 'shrimp'];
						}}>
							<img src="/img/pizzaparts/shrimp.svg" alt="Shrimp" />
							Shrimp
						</button>
						<button on:click={() => {
							if (pizza.meats.includes('bacon')) {
								return;
							}

							pizza.meats = [...pizza.meats, 'bacon'];
						}}>
							<img src="/img/pizzaparts/bacon.svg" alt="Bacon" />
							Bacon
						</button>
						<button on:click={() => {
							if (pizza.meats.includes('ham')) {
								return;
							}

							pizza.meats = [...pizza.meats, 'ham'];
						}}>
							<img src="/img/pizzaparts/ham.svg" alt="Ham" />
							Ham
						</button>
						<button on:click={() => pizza.meats = []}>
							<img src="/img/misc/no.svg" alt="No Meats" />
							No Meats
						</button>
					</div>
				{/if}
				{#if lineNumber == 7}
					<div id="pizzaChoiceHeader">Choose your veggies!</div>
					<div id="pizzaChoiceButtons">
						<button on:click={() => {
							if (pizza.veggies.includes('mushrooms')) {
								return;
							}

							pizza.veggies = [...pizza.veggies, 'mushrooms'];
						}}>
							<img src="/img/pizzaparts/mushrooms.svg" alt="Mushrooms" />
							Mushrooms
						</button>
						<button on:click={() => {
							if (pizza.veggies.includes('onions')) {
								return;
							}

							pizza.veggies = [...pizza.veggies, 'onions'];
						}}>
							<img src="/img/pizzaparts/onions.svg" alt="Onions" />
							Onions
						</button>
						<button on:click={() => {
							if (pizza.veggies.includes('tomatoes')) {
								return;
							}

							pizza.veggies = [...pizza.veggies, 'tomatoes'];
						}}>
							<img src="/img/pizzaparts/tomatoes.svg" alt="Tomatoes" />
							Tomatoes
						</button>
						<button on:click={() => {
							if (pizza.veggies.includes('peppers')) {
								return;
							}

							pizza.veggies = [...pizza.veggies, 'peppers'];
						}}>
							<img src="/img/pizzaparts/peppers.svg" alt="Peppers" />
							Peppers
						</button>
						<button on:click={() => {
							if (pizza.veggies.includes('pineapple')) {
								return;
							}

							pizza.veggies = [...pizza.veggies, 'pineapple'];
						}}>
							<img src="/img/pizzaparts/pineapple.svg" alt="Pineapple" />
							Pineapple
						</button>
						<button on:click={() => pizza.veggies = []}>
							<img src="/img/misc/no.svg" alt="No Veggies" />
							No Veggies
						</button>
					</div>
				{/if}
				{#if lineNumber == 8}
					<div id="pizzaChoiceHeader">Finishing touches?</div>
					<div id="pizzaChoiceButtons">
						<button on:click={() => {
							if (pizza.finishingTouches.includes('basil')) {
								return;
							}

							pizza.finishingTouches = [...pizza.finishingTouches, 'basil'];
						}}>
							<img src="/img/pizzaparts/basil.svg" alt="Basil" />
							Basil
						</button>
						<button on:click={() => {
							if (pizza.finishingTouches.includes('herbs')) {
								return;
							}

							pizza.finishingTouches = [...pizza.finishingTouches, 'herbs'];
						}}>
							<img src="/img/pizzaparts/herbs.svg" alt="Herbs" />
							Herbs
						</button>
						<button on:click={() => {
							if (pizza.finishingTouches.includes('parmesan')) {
								return;
							}

							pizza.finishingTouches = [...pizza.finishingTouches, 'parmesan'];
						}}>
							<img src="/img/pizzaparts/parmesan.svg" alt="Parmesan" />
							Parmesan
						</button>
						<button on:click={() => {
							if (pizza.finishingTouches.includes('olives')) {
								return;
							}

							pizza.finishingTouches = [...pizza.finishingTouches, 'olives'];
						}}>
							<img src="/img/pizzaparts/olives.svg" alt="Olives" />
							Olives
						</button>
						<button on:click={() => {
							if (pizza.finishingTouches.includes('jalapeno')) {
								return;
							}

							pizza.finishingTouches = [...pizza.finishingTouches, 'jalapeno'];
						}}>
							<img src="/img/pizzaparts/jalapeno.svg" alt="Jalapeno" />
							Jalapeno
						</button>
						<button on:click={() => pizza.finishingTouches = []}>
							<img src="/img/misc/no.svg" alt="No Finishing Touches" />
							None
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div slot="content" id="content"  bind:this={content}>
		{#if lineNumber == 1 }
			<button id="startButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
				<img src="/img/misc/pizzastart.png" alt="Start" />
			</button>
		{/if}
		{#if lineNumber > 1 }
			<img src="/img/misc/cuttingboard.png" id="bgboard" alt="cutting board" />

			{#if lineNumber > 2}
				<PizzaDisplay size={"45vw"} bind:this={pizzaDisplay} {...pizza} />
			{/if}

			<div id="navButtons">
				<button id="prevButton" on:click={() => handleNavigation(NavigationDirection.backward)}>
					<img src="/img/misc/pizzaback.png" alt="Previous" />
				</button>
				<button id="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
					<img src="/img/misc/pizzanext.png" alt="Next" />
				</button>
			</div>
		{/if}
	</div>
</Scene>


<style>
	#content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: absolute;
		right: 0;
		width: 70vw;
	}

	#startButton {
		transition: all 0.3s;
	}

	#startButton:hover {
		transform: scale(1.1);
		filter: brightness(1.1);
	}

	#startButton:active {
		transform: scale(0.9);
		filter: brightness(0.9);
	}

	#startButton img {
		width: 30vw;
	}

	#bgboard {
		width: 90%;
		max-width: unset;
		position: absolute;
		pointer-events: none;
		user-select: none;
		right: 0;
	}

	#navButtons {
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-height: 10vh;
	}

	#prevButton, #nextButton {
		transition: all 0.3s;
	}

	#prevButton:hover, #nextButton:hover {
		transform: scale(1.05);
		filter: brightness(1.1);
	}

	#prevButton:active, #nextButton:active {
		transform: scale(0.9);
		filter: brightness(0.9);
	}

	#prevButton img, #nextButton img {
		max-height: 10vh;
	}

	#pizzaChoices {
		position: absolute;
		top: 0;
		left: 0;
		width: 30vw;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.1);
		color: white;
		font-size: 2em;
	}

	#pizzaChoiceHeader {
		font-size: 1.25em;
		color: white;
		text-align: center;
	}

	#pizzaChoiceButtons {
		display: flex;
		flex-flow: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		height: 100%;
  		column-gap: 5vw;
		row-gap: 2vh;
		align-content: center;
	}

	#pizzaChoiceButtons button {
		text-align: center;
		transition: all 0.3s;
	}

	#pizzaChoiceButtons button:hover {
		transform: scale(1.1);
		filter: brightness(1.1);
	}

	#pizzaChoiceButtons button img {
		width: 8vw;
		max-width: 8vw;
		margin: auto;
	}
</style>