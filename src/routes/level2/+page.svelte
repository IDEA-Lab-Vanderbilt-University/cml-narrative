<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { StudentProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level2/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';

	export let data;

	let line: Line;

	$: line = data.line;

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event: any) => {
		var state: NavigationDirection = event.detail.state;

		handleNavigation(state);
	};

	const getUpdatedProgress = (): StudentProgress => {
		return {
			level: 0,
			levelLabel: 'level-one',
			subLevel: 0,
			last_visited: '/level1?page=1',
			lastUpdated: new Date()
		};
	}

	const updateLocalProgress = (progress: StudentProgress) => {
		userDataStore.update((data) => {
			data.progress = progress;
			return data;
		})
	}

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward) {
			if (line.id == script.lines.length) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress);
				
                // Next level
                goto('/level2/car-training?page=1');
			} else {

				if (line.id >= 29 && line.id <= 34) {
					// GPS navigation screens
					return;
				}
				goto(`/level2?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				if (line.id >= 29 && line.id <= 34) {
					// GPS navigation screens
					goto(`/level2?page=29`);
					return;
				}
				goto(`/level2?page=${line.id - 1}`);
			} else {
				goto('/level1/outro?page=14');
			}
		}
	};

	let content: HTMLElement | void;
</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		{#if line.id < 29 || line.id > 35}
			<DialogBox {line} on:dialogEvent={handleDialogEvent} />
		{:else if line.id > 29 && line.id <= 35}
			<div id="mapdialog">
				<div id="mapdialogtitle">
					{line.speakers[0]}
				</div>
				<div id="mapdialogcontent">
					<img id="mapdialogimage" src={line.avatars[0]} alt={line.speakers[0]} />
					<p>
						{line.dialog}
					</p>
					<button on:click={() => { if(line.id == 35) { goto('/level2?page=36') } else { goto('/level2?page=29') } }}>
						<div id="mapdialogbuttontext"> 
							{line.id == 35 ? 'Let\'s Go' : 'Back'}
						</div>
					</button>
				</div>
			</div>
		{/if}

	</div>
	<div slot="content" class="h-full w-full"  bind:this={content}>
		{#if line.id < 46}
		<TabletButton on:click={() => { 
			if(line.id != 46){
				const event  = new CustomEvent('showTablet', {
					bubbles: true
				});
				
				content?.dispatchEvent(event);
			}
		}}
		/>
		{:else if line.id == 46}
		<TabletButton pulse on:click={() => { 
			handleNavigation(NavigationDirection.forward);
		}} />
		{/if}

		{#if line.id == 2}
		<div id="spinring">
			{line.dialog}
		</div>
		{/if}

		{#if line.id == 17 || line.id == 20}
		<div id="carscanner">
			<img src="/img/misc/scanprompt.png" alt={line.dialog}>
		</div>
		{/if}

		{#if line.id == 18 || line.id == 21}
		<div id="carscanner">
			<img src="/img/misc/scanfailed.png" alt={line.dialog}>
		</div>
		{/if}

		{#if line.id == 27}
		<div id="licenseplate">
			<img src="/img/misc/licenseplate.png" alt={line.dialog}>
		</div>
		{/if}

		{#if line.id >= 29 && line.id <= 35}
		<div id="map" class="{line.id > 29 && line.id <= 35 ? 'map-disabled' : ''}">
			<img src="/img/misc/map-icons/school.png" id="school" class="mapicon" alt="School" />
			<button id="firestation" on:click={() => { goto('/level2?page=33') }} class="mapicon">
				<img src="/img/misc/map-icons/firestation.png" alt="Fire Station"/>
			</button>
			<button id="icecream" on:click={() => { goto('/level2?page=32') }} class="mapicon">
				<img src="/img/misc/map-icons/icecream.png" alt="Ice Cream"/>
			</button>
			<button id="museum" on:click={() => { goto('/level2?page=30') }} class="mapicon">
				<img src="/img/misc/map-icons/museum.png" alt="Museum"/>
			</button>
			<button id="pizzaplace" on:click={() => { goto('/level2?page=31') }} class="mapicon">
				<img src="/img/misc/map-icons/pizzaplace.png" alt="Pizza Place"/>
			</button>
			<button id="toilet" on:click={() => { goto('/level2?page=34') }} class="mapicon">
				<img src="/img/misc/map-icons/toilet.png" alt="Toilet"/>
			</button>
			<button id="vroom" on:click={() => { goto('/level2?page=35') }} class="mapicon">
				<img src="/img/misc/map-icons/vroom.png" alt="Vroom Vroom"/>
			</button>
		</div>
		{/if}

		{#if line.id == 36}
		<button id="elevatorbtn" on:click={() => { goto('/level2?page=37') }}></button>
		{/if}

		{#if line.id == 47}
		<Tablet>
			<SpotApplication
        color="rgb(175,105,190)"
        title="Car Training"
        img="/img/icons/car.svg"
		on:applicationContainerEvent={() => {}}
		on:click={() => handleNavigation(NavigationDirection.forward)} 
		pulse />
		</Tablet>
		{/if}

	</div>
</Scene>

<style>
	#spinring::before {
		content: '';
		background: url('/img/misc/spinring.png');
		width: 70vh;
		height: 70vh;
		animation: spin 2s linear infinite;
		background-size: contain;
		position: absolute;
		left: calc(50% - 35vh);
		top: calc(50% - 35vh);
		z-index: -1;
	}

	#spinring {
		width: 45vh;
		text-align: center;
		vertical-align: middle;
		font-size: 4vh;
		color: mediumspringgreen;
		text-transform: uppercase;
		position: absolute;
		left: calc(50% - 22.5vh);
		top: calc(50% - 22.5vh);
	}

	#carscanner {
		width: 45vh;
		text-align: center;
		vertical-align: middle;
		font-size: 4vh;
		color: yellow;
		text-transform: uppercase;
		position: absolute;
		left: calc(50% - 22.5vh);
		top: calc(50% - 22.5vh);
	}

	#licenseplate {
		width: 35vw;
		text-align: center;
		vertical-align: middle;
		font-size: 4vh;
		color: yellow;
		text-transform: uppercase;
		position: absolute;
		left: calc(50% - 17.5vw);
		top: 2%;
	}

	#map {
		width: 100vw;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		background: url('/img/misc/map.svg');
		background-size: cover;
		background-position: center 10%;
	}

	.map-disabled {
		pointer-events: none;
		filter: grayscale(40%) brightness(50%) blur(2px);
	}

	.mapicon {
		position: absolute;
		width: 15vh;
		transition: all 0.2s ease-in-out;
	}

	.mapicon:hover {
		transform: scale(1.2);
	}

	.mapicon:active {
		transform: scale(0.8);
	}

	#school {
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	#firestation {
		left: 20%;
		top: 50%;
	}

	#icecream {
		left: 80%;
		top: 50%;
	}

	#museum {
		left: 70%;
		top: 20%;
	}

	#pizzaplace {
		left: 50%;
		top: 70%;
	}

	#toilet {
		left: 10%;
		top: 20%;
	}

	#vroom {
		left: 70%;
		top: 70%;
	}

	#mapdialog {
		position: absolute;
		width: 55vw;	
		background: rgb(6, 93, 174);
		color: white;
		border-radius: 1rem;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	#mapdialogtitle {
		background: white;
		color: black;
		margin: 1rem;
		padding: 1rem;
		font-size: 2.5rem;
		border-radius: 1rem;
		font-weight: bold;
	}

	#mapdialogcontent {
		background: white;
		color: black;
		margin: 1rem;
		padding: 1rem;
		font-size: 2rem;
		border-radius: 1rem;
		min-height: 35vh;
	}
	
	#mapdialogimage {
		max-height: 65%;
		max-width: 20vw;
		float: left;
		position: absolute;
		bottom: 1rem;
		left: 1rem;
	}

	#mapdialogcontent {  
		padding-left: 18vw;
	}

	#mapdialogcontent p {
		background: lightblue;
		padding: 1rem;
		border-radius: 1rem;
		margin: 1rem;
	}

	#mapdialogcontent button {
		border: 0.5vh solid rgb(6, 93, 174);
		background: rgb(88, 216, 255);
		color: black;
		border-radius: 1rem;
		padding: 1rem;
		font-size: 2rem;
		cursor: pointer;
		margin-left: 18vh;
		transition: all 0.2s ease-in-out;
	}

	#mapdialogcontent button:hover {
		background: rgb(6, 93, 174);
		transform: scale(1.1);
	}

	#mapdialogcontent button:active {
		background: rgb(88, 216, 255);
		transform: scale(0.9);
	}

	#elevatorbtn {
		position: absolute;
		width: 10vw;
		height: 10vh;
		left: calc(50% - 10vw);
		top: calc(50% + 1vh);
		z-index: 100;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		25% { transform: rotate(90deg); }
		75% { transform: rotate(-270deg); }
		100% { transform: rotate(0deg); }
	}

</style>