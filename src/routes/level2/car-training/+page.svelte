<svelte:document />

<script lang="ts">
	import { goto } from '$app/navigation';
	import CarTrainingDialogBox from '$lib/components/activities/car-training/CarTrainingDialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import script from '$lib/scripts/level2/car-training/index.js';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { Student, StudentProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { studentDataStore, studentProgressStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';

    let agent: Student = {};

    studentDataStore.subscribe((value) => {
        agent = value;
    });

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

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
		let target = '';

		if (direction == NavigationDirection.forward) {
			if (lineNumber >= script.lines.length) {
                // Next level
				target = '/level2/outro?page=1';
			} else {
				target = `/level2/car-training?page=${line.id + 1}`;
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			target = `/level2/car-training?page=${line.id - 1}`;
		}

		if (target) {
			studentProgressStore.update((data) => {
				data.last_visited = target;
				return data;
			});
			goto(target);
		}
	};

	let content: HTMLElement | void;

    let lineNumber = 1;
    $: lineNumber = line.id;

	let choiceOptions = [
		'Stop when people cross the street',
		'Recognize human faces',
		'Open doors for humans',
		'Honk at birds',
		'Recognize street signs',
		'Open doors for all animals',
	];

	let choiceCorrect = [
		true,
		true,
		true,
		false,
		true,
		false,
	];

	let choicesCorrect = false;

	let validateChoices = () => {
		choicesCorrect = false;

		let options = document.querySelectorAll(".option");
		
		for(let i = 1; i < options.length; i++) {
			let option = options[i];
			let yes = option.querySelector(".positive button") as HTMLButtonElement;
			let no = option.querySelector(".negative button") as HTMLButtonElement;

			if (choiceCorrect[i - 1] && yes?.style.backgroundColor == 'green') {
				continue;
			} else if (!choiceCorrect[i - 1] && no?.style.backgroundColor == 'green') {
				continue;
			} else {
				console.log("Choice " + i + " is incorrect");
				return;
			}
		}

		console.log("All choices correct");

		choicesCorrect = true;
	}

	let trainingFaceFolder: HTMLElement | void;
	let addedFaces = 0;
	let addedNoFaces = 0;



	let parsonsPairs = [
		['Cheese requested', 'Add cheese to pizza'],
		['Toppings requested', 'Add toppings to pizza'],
		['Pizza is cooked', 'Remove pizza from oven']
	];

	// The palette of blocks available in the Parsons Problem
	let palette: HTMLElement | void;

	$: if (palette) {
		// Shuffle blocks in palette
		let blocksList = palette.querySelectorAll('.predicateBlock, .commandBlock');
		let blocks = Array.from(blocksList);
		for (let i = blocks.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[blocks[i], blocks[j]] = [blocks[j], blocks[i]];
		}

		for (let i = 0; i < blocks.length; i++) {
			palette.appendChild(blocks[i]);
		}
	}


	/**
	 * Handles the drag event for blocks in the palette
	 * @param e Drag event object
	 */
		const blockDragHandler = (e: DragEvent) => {
		console.log('Block picked up', e);
		if (e.dataTransfer && e.target && e.target instanceof HTMLElement) {
			e.dataTransfer.clearData();
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.setData('text/plain', e.target.outerHTML);
		}
	};

	/**
	 * Handles the drop event for blocks on the target slots
	 * @param e Drag event object
	 * @param blockClass The class of the block that is being dropped (e.g. predicateBlock, commandBlock)
	 */
	const blockDropHandler = (e: DragEvent, blockClass: string) => {
		console.log('Block dropped', e);
		if(e.dataTransfer && e.dataTransfer.getData('text/plain') && e.target instanceof HTMLElement) {
			if(e.dataTransfer.getData('text/plain').includes(blockClass)) {
				let t = e.target;

				// Find the slot that the block was dropped on
				while(t.parentElement instanceof HTMLElement && !t.classList.contains('slot')) {
					t = t.parentElement;
				}

				// If we found a slot of the correct type, drop the block in it
				if(t instanceof HTMLElement && t.classList.contains('slot')) {
					if(!t.classList.contains('slotDropped')) {
						// Find original block to remove
						let originalBlock = Array.from(document.querySelectorAll('.' + blockClass))
							.filter((block) => block.outerHTML == e.dataTransfer?.getData('text/plain'));
							
							if(originalBlock.length > 0) {
								// Check if the block was already in a slot
								if(originalBlock[0].parentElement instanceof HTMLElement && originalBlock[0].parentElement.classList.contains('slotDropped')) {
										let slot = originalBlock[0].parentElement;
										slot.classList.remove('slotDropped');
										slot.classList.add(blockClass + 'Slot');
										slot.style['padding'] = '';
										slot.innerHTML = '';
								} else {
									originalBlock[0].remove();
								}
						}


						t.innerHTML = e.dataTransfer.getData('text/plain');
						
						let block = t.children[0] as HTMLElement;
						block.style['padding'] = '0';
						block.ondragstart = blockDragHandler;

						t.style['padding'] = '0';
						t.classList.add('slotDropped');
						t.classList.remove(blockClass + 'Slot');

					} else {
						// If the slot is already filled, remove the block from the slot and place it back in the palette
						
						// First, check if this is the same block being dragged back to its original position
						let originalBlock = Array.from(document.querySelectorAll('.' + blockClass))
							.filter((block) => block.outerHTML == e.dataTransfer?.getData('text/plain'));                            

						// Send the block back to the palette
						let palette = document.querySelector('.palette');
						if(palette instanceof HTMLElement) {
							(t.children[0] as HTMLElement).style['padding'] = '';
							palette.appendChild(t.children[0]);
						}

						if(originalBlock.length > 0) {
							// Check if the block was already in a slot
							if(originalBlock[0].parentElement instanceof HTMLElement && originalBlock[0].parentElement.classList.contains('slotDropped')) {
								let slot = originalBlock[0].parentElement;
								slot.classList.remove('slotDropped');
								slot.classList.add(blockClass + 'Slot');
								slot.style['padding'] = '';
								slot.innerHTML = '';
							} else {
								originalBlock[0].remove();
							}
						}


						t.innerHTML = e.dataTransfer.getData('text/plain');

						let block = t.children[0] as HTMLElement;
						block.style['padding'] = '0';
						block.ondragstart = blockDragHandler;

						t.style['padding'] = '0';
						t.classList.add('slotDropped');
						t.classList.remove(blockClass + 'Slot');
					}
				}
			}
		}

		validateParsonsProblem();

		e.preventDefault();
	};

	const paletteDrop = (e: DragEvent) => {
		// Allow dropping blocks in the palette
		e.preventDefault();

		let block = e.dataTransfer?.getData('text/plain');

		if(block && palette) {
			console.log('Block dropped in palette', e, block);

			// Check if block is already in the palette
			let blocks = palette.querySelectorAll('.predicateBlock, .commandBlock');
			let blockExists = blocks.length > 0 && Array.from(blocks).some((b) => b.outerHTML == block);

			if(!blockExists) {
				// Create a new block element and add it to the palette
				let blockElement = document.createElement('div');
				blockElement.innerHTML = block;
				blockElement.ondragstart = blockDragHandler;
				palette.appendChild(blockElement);


				// If block is in a slot, remove it from the slot
				let originalBlock = Array.from(document.querySelectorAll('.slotDropped'))
					.filter((slot) => slot.innerHTML == block);

				if(originalBlock.length > 0 && originalBlock[0] instanceof HTMLElement) {
					originalBlock[0].classList.remove('slotDropped');
					originalBlock[0].classList.add(blockElement.children[0].classList[0] + 'Slot');
					originalBlock[0].style['padding'] = '';
					originalBlock[0].innerHTML = '';
				}

			}
		}
	};

	let parsonsProblemSolved = false;

	const validateParsonsProblem = () => {
		let ifs = document.querySelectorAll('.ifBlock');
		let droppedSlots = document.querySelectorAll('.slotDropped');

		// Check if all slots are filled
		if(droppedSlots.length != 5) {
			parsonsProblemSolved = false;
			return;
		}

		// Check if all slots are filled with the correct blocks
		let correct = true;

		// Check first command block
		let commandSlot = droppedSlots[0];
		if(commandSlot) {
			let command = commandSlot.querySelector('.blockcontent p') as HTMLElement;

			if(command) {
				console.log(command.innerText);
				if(command.innerText == "Scan for face") {
					// Continue
				} else {
					parsonsProblemSolved = false;
					console.log('Incorrect block in slot');
					return;
				}
			} else {
				correct = false;
			}
		} else {
			correct = false;
		}

		// Check if statement blocks 
		for(let i = 0; i < ifs.length; i++) {
			// Check if the predicate and command slots are filled
			let predicateSlot = ifs[i].querySelector('.predicateBlock');
			let commandSlot = ifs[i].querySelector('.commandBlock');

			if(predicateSlot && commandSlot) {
				// Check if the predicate and command slots are filled with the correct blocks
				let predicate = predicateSlot.querySelector('.blockcontent p') as HTMLElement;
				let command = commandSlot.querySelector('.blockcontent p') as HTMLElement;

				if(predicate && command) {

					console.log(predicate.innerText, command.innerText);
					if(predicate.innerText == "Face detected" && command.innerText == "Open Door") {
						continue;
					} else if(predicate.innerText == "No face detected" && command.innerText == "Say \"Face Not Recognized\"") {
						continue;
					} else {
						parsonsProblemSolved = false;
						console.log('Incorrect block in slot');
						return;
					}
				} else {
					correct = false;
					break;
				}
			} else {
				correct = false;
				break;
			}
		}

		parsonsProblemSolved = correct;
	};

	let facesScanned = 0;

</script>

<Scene background={line.background} audio={line.audio} bgPosition={line.id == 11 ? 'bottom' : 'center'}>
	<div class="w-full" slot="dialog">
		<CarTrainingDialogBox {line} on:dialogEvent={handleDialogEvent} showNext={lineNumber < script.lines.length && !([2, 5, 7, 11, 12, 16, 17].includes(lineNumber))} showBack={lineNumber > 1} />
	</div>
	<div slot="content" class="content"  bind:this={content}>
		{#if line.id == 1}
			<img src="/img/misc/vroomlogo.png" alt="Vroom" style="width: 70%;" />
		{/if}

		{#if line.id == 2}
			<div class="options">
				<div class="option">
					<div style="text-align: center; width: 2vw; font-size: 1.5vw;">
						Yes 
					</div>
					<div style="text-align: center; width: 2vw; font-size: 1.5vw;">
						No 
					</div>
					<div style="text-align: center; font-size: 1vw;">
						Which of these do we need to<br/> train our cars to be able to do?
					</div>
				</div>
				{#each choiceOptions as option, i}
					<div class="option flex flex-row w-full">
						<div class="positive">
							<button class="radio" on:click={(e) => {
								if(!(e.target instanceof HTMLElement)) {
									return;
								}

								let ele = document.getElementById("choice" + i + "_no");

								if(!ele) {
									return;
								}

								if (choiceCorrect[i]) {
									e.target.style.backgroundColor = 'green';
									ele.style.backgroundColor = '';
								} else {
									e.target.style.backgroundColor = 'red';
									ele.style.backgroundColor = '';
								}

								validateChoices();
							}}
							id={"choice" + i + "_yes"}>
							</button>
						</div>
						<div class="negative">
							<button class="radio" on:click={(e) => {
								if(!(e.target instanceof HTMLElement)) {
									return;
								}

								let ele = document.getElementById("choice" + i + "_yes");

								if(!ele) {
									return;
								}

								if (!choiceCorrect[i]) {
									e.target.style.backgroundColor = 'green';
									ele.style.backgroundColor = '';
								} else {
									e.target.style.backgroundColor = 'red';
									ele.style.backgroundColor = '';
								}

								validateChoices();
							}}
							id={"choice" + i + "_no"} >
							</button>
						</div>
						<label for={"choice" + i}>{option}</label>
					</div>
				{/each}
			</div>

			{#if choicesCorrect}
				<button class="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
					<img src="/img/misc/vroomnext.png" alt="Next" />
				</button>
			{/if}
		{/if}

		{#if line.id == 4}
			<img src="/img/misc/faces.png" alt="Faces" style="width: 70%;" />
		{/if}

		{#if line.id == 5}
			<div class="flex flex-col justify-center items-center">
				<div>
					{#each [0, 1, 2, 3] as i}
						{#each [0, 1, 2, 3] as j}
							<button 
								style="background: url('/img/misc/trainingfaces.png'); width: 10vw; height: 8vw; background-position: -{j * 10}vw -{i * 8}vw; background-size: 40vw 32vw; transition: transform 1.5s ease-out, opacity 1.5s ease-out;"
								on:click={(event) => {
									let target = event.target;
	
									if (!(target instanceof HTMLElement)) {
										return;
									}
	
									// Move to the folder icon
									let folderPos = trainingFaceFolder?.getBoundingClientRect();
									let buttonPos = target.getBoundingClientRect();
	
									if (!folderPos || !buttonPos) {
										return;
									}


									let x = folderPos.left - buttonPos.left;
									let y = folderPos.top - buttonPos.top;

									target.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
									target.style.opacity = '0';
									addedFaces++;
								}}
							>
							</button>
						{/each}
						<br/>
					{/each}
				</div>
				<img src="/img/misc/trainingfacesfolder.png" alt="Training data faces" style="height: 20vh;  width: fit-content;" bind:this={trainingFaceFolder} />
			</div>

			{#if addedFaces >= 3}
				<button class="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
					<img src="/img/misc/vroomnext.png" alt="Next" />
				</button>
			{/if}
		{/if}

		{#if line.id == 6}
			<div>
				<img src="/img/misc/facerecognized.png" alt="Face" style="width: 70%;" />
				<div class="recognizedText">HUMAN FACE RECOGNIZED</div>
			</div>
		{/if}

		{#if line.id == 7}
		<div class="flex flex-col justify-center items-center">
			<div>
				{#each [0, 1, 2, 3] as i}
					{#each [0, 1, 2, 3] as j}
						<button 
							style="background: url('/img/misc/trainingnofaces.png'); width: 10vw; height: 8vw; background-position: -{j * 10}vw -{i * 8}vw; background-size: 40vw 32vw; transition: transform 1.5s ease-out, opacity 1.5s ease-out;"
							on:click={(event) => {
								let target = event.target;

								if (!(target instanceof HTMLElement)) {
									return;
								}

								// Move to the folder icon
								let folderPos = trainingFaceFolder?.getBoundingClientRect();
								let buttonPos = target.getBoundingClientRect();

								if (!folderPos || !buttonPos) {
									return;
								}

								let x = folderPos.left - buttonPos.left;
								let y = folderPos.top - buttonPos.top;

								target.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
								target.style.opacity = '0';
								addedNoFaces++;
							}}
						>
						</button>
					{/each}
					<br/>
				{/each}
			</div>
			<img src="/img/misc/trainingnofacesfolder.png" alt="Training data faces" style="height: 20vh;  width: fit-content;" bind:this={trainingFaceFolder} />
		</div>

		{#if addedNoFaces >= 3}
			<button class="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
				<img src="/img/misc/vroomnext.png" alt="Next" />
			</button>
		{/if}
		{/if}

		{#if line.id == 8}
			<div>
				<img src="/img/misc/nofacerecognized.png" alt="No Face" style="width: 70%;" />
				<div class="notRecognizedText text-red">NO FACE RECOGNIZED</div>
			</div>
		{/if}

		{#if line.id == 9 || line.id == 10}
			<img src="/img/characters/level-2/dash/dash-trainingdata.png" alt="Training data" style="height:  70%;" />
		{/if}

		{#if line.id == 11}
			<img id="dashboard" src="/img/backgrounds/level2/car-training/dashboard.png" alt="Dashboard" />
			<button id="gpsglowing"
				on:click={() => handleNavigation(NavigationDirection.forward)}
			></button>
		{/if}		

		{#if line.id == 12}
			<img id="dashboard" src="/img/backgrounds/level2/car-training/dashboard.png" alt="Dashboard" />
			<div class="grayfilter"></div>

			<div class="palette" bind:this={palette} on:drop={paletteDrop} on:dragover={(e) => e.preventDefault()} role="list">
				
				<div class="commandBlock" draggable="true" role="listitem"            
				on:dragstart={blockDragHandler}>
					<div class="blockstart" />
					<div class="blockcontent">
						<p>Honk Horn</p>
					</div>
					<div class="blockend" />
				</div>

				<div class="commandBlock" draggable="true" role="listitem"            
				on:dragstart={blockDragHandler}>
					<div class="blockstart" />
					<div class="blockcontent">
						<p>Scan for face</p>
					</div>
					<div class="blockend" />
				</div>

				<div class="commandBlock" draggable="true" role="listitem"
				on:dragstart={blockDragHandler}
				>
					<div class="blockstart" />
					<div class="blockcontent">
						<p>Open Door</p>
					</div>
					<div class="blockend" />
				</div>

				<div class="commandBlock" draggable="true" role="listitem"
				on:dragstart={blockDragHandler}
				>
					<div class="blockstart" />
					<div class="blockcontent">
						<p>Say "Face Not Recognized"</p>
					</div>
					<div class="blockend" />
				</div>

				<div class="predicateBlock" draggable="true" role="listitem"            
				on:dragstart={blockDragHandler}>
					<div class="blockstart" />
					<div class="blockcontent">
						<p>Face detected</p>
					</div>
					<div class="blockend" />
				</div>

				<div class="predicateBlock" draggable="true" role="listitem"            
				on:dragstart={blockDragHandler}>
					<div class="blockstart" />
					<div class="blockcontent">
						<p>No face detected</p>
					</div>
					<div class="blockend" />
				</div>

			</div>

			<div class="targetBlocks">
				<div class="commandBlockSlot slot"  role="listitem"
					on:dragenter={(e) => {
						console.log('dragenter', e);
						e.preventDefault();
					}}

					on:dragleave={(e) => {
						console.log('dragleave', e);
						e.preventDefault();
					}}

					on:dragover={(e) => {
						e.preventDefault();
					}}

					on:drop={(e) => blockDropHandler(e, 'commandBlock')}
				/>
				<div class="ifBlock">
					<div style="clear: both;">
						<div class="blocktopstart" />
						<div class="blockcontent">
							<span>
								If 
							</span>
							<div class="predicateBlockSlot slot" 
							role="listitem" 
							on:dragenter={(e) => {
								console.log('dragenter', e);
								e.preventDefault();
							}}
							on:dragleave={(e) => {
								console.log('dragleave', e);
								e.preventDefault();
							}}
							on:dragover={(e) => {
								e.preventDefault();
							}}
							on:drop={(e) => blockDropHandler(e, 'predicateBlock')}
							/>
							<span>
								then
							</span>
						</div>
						<div class="blocktopend" />
					</div>
					<div style="clear: both;">
						<div class="blockstem" />
						<div class="blockinner">
							<div class="commandBlockSlot slot"  role="listitem"
							on:dragenter={(e) => {
								console.log('dragenter', e);
								e.preventDefault();
							}}

							on:dragleave={(e) => {
								console.log('dragleave', e);
								e.preventDefault();
							}}

							on:dragover={(e) => {
								e.preventDefault();
							}}

							on:drop={(e) => blockDropHandler(e, 'commandBlock')}
							/>
						</div>
					</div>
					<div class="blockend" />
				</div>
				<div class="ifBlock">
					<div style="clear: both;">
						<div class="blocktopstart" />
						<div class="blockcontent">
							<span>
								If 
							</span>
							<div class="predicateBlockSlot slot" 
							role="listitem" 
							on:dragenter={(e) => {
								console.log('dragenter', e);
								e.preventDefault();
							}}
							on:dragleave={(e) => {
								console.log('dragleave', e);
								e.preventDefault();
							}}
							on:dragover={(e) => {
								e.preventDefault();
							}}
							on:drop={(e) => blockDropHandler(e, 'predicateBlock')}
							/>
							<span>
								then
							</span>
						</div>
						<div class="blocktopend" />
					</div>
					<div style="clear: both;">
						<div class="blockstem" />
						<div class="blockinner">
							<div class="commandBlockSlot slot"  role="listitem"
							on:dragenter={(e) => {
								console.log('dragenter', e);
								e.preventDefault();
							}}

							on:dragleave={(e) => {
								console.log('dragleave', e);
								e.preventDefault();
							}}

							on:dragover={(e) => {
								e.preventDefault();
							}}

							on:drop={(e) => blockDropHandler(e, 'commandBlock')}
							/>
						</div>
					</div>
					<div class="blockend" />
				</div>

				{#if parsonsProblemSolved}
					<div id="navButtons">
						<button id="nextButton" on:click={() => goto('/level2/car-training?page=13')}>
							<img src="/img/misc/pizzanext.png" alt="Send" />
						</button>
					</div>
				{/if}
			</div>
		{/if}

		{#if line.id == 13 || line.id == 14 || line.id == 15}
			<img src="/img/misc/testset.png" alt="Test set faces" style="width: 70%;" />
		{/if}

		{#if line.id == 16 || line.id == 17}
		<div id="scanner">
			<div id="scannerimgs">
				{#if line.id == 16}
					{#each [0, 1, 2, 3] as i}
						<div id="scanface{i}" style="background: url('/img/misc/testfaces.png'); width: 10vw; height: 8vw; background-position: 0 -{i * 8}vw; background-size: 10vw 32vw;"
						draggable="true"
						on:dragstart={(e) => {
							if (e.dataTransfer && e.target && e.target instanceof HTMLElement) {
								e.dataTransfer.setData('text/plain', e.target.id);
								e.dataTransfer.effectAllowed = 'move';
							}
						}}
						role="listitem"
						/>
					{/each}
				{:else if line.id == 17}
					{#each [0, 1, 2, 3] as i}
						<div id="scanface{i}" style="background: url('/img/misc/testnofaces.png'); width: 10vw; height: 8vw; background-position: 0 -{i * 8}vw; background-size: 10vw 32vw;"
						draggable="true"
						on:dragstart={(e) => {
							if (e.dataTransfer && e.target && e.target instanceof HTMLElement) {
								e.dataTransfer.setData('text/plain', e.target.id);
								e.dataTransfer.effectAllowed = 'move';
							}
						}}
						role="listitem"
						/>
					{/each}
				{/if}

			</div>
			<img src="/img/misc/scanprompt.png" alt="Scanner" style="width: 50%;" id="scanprompt"
			on:drop={(e) => {
				e.preventDefault();

				let data = e.dataTransfer?.getData('text/plain');
				if (!data) {
					return;
				}

				let face = document.getElementById(data);
				
				if (!face) {
					return;
				}

				face.style.background = 'none';

				let scanPrompt = document.getElementById("scanprompt");

				if(!scanPrompt || !(scanPrompt instanceof HTMLImageElement)) {
					return;
				}

				if(line.id == 16){
					scanPrompt.src = "/img/misc/facedetected.png";
				} else {
					scanPrompt.src = "/img/misc/scanfailed.png";
				}
				setTimeout(() => {
					scanPrompt.src = "/img/misc/scanprompt.png";
				}, 1500);

				facesScanned++;

			}}
			on:dragover={(e) => e.preventDefault()} 
			/>
		</div>

			{#if facesScanned > 0}
				<button class="nextButton" on:click={() => {
					handleNavigation(NavigationDirection.forward); 
					facesScanned = 0;
				}}>
					<img src="/img/misc/vroomnext.png" alt="Next" />
				</button>
			{/if}
		{/if}


		{#if line.id == 18}
			<button class="endButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
				<img src="/img/misc/goodbyebtn.png" alt="Next" />
			</button>
		{/if}
	</div>
</Scene>


<style>
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 65vw;
		position: absolute;
		top: 0;
		right: 0;
	}

	.options {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		gap: 1vh;
		background-color: white;
		padding: 1vh;
		border: 0.2vw solid rgb(255, 150, 230);
	}

	.option {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 1vw;
		width: 100%;
	}

	.option label {
		font-size: 1.5vw;
		color:  rgb(189, 75, 207);
		border-bottom: 0.25vw solid black;
	}

	.option input[type="radio"] {
		display: none;
	}

	.option input[type="radio"] + span {
		width: 1.5vw;
		height: 1.5vw;
		border-radius: 50%;
		border: 1px solid black;
		display: inline-block;
		position: relative;
		left: 25%;
	}

	.option input[type="radio"]:checked + span {
		background-color: black;
	}

	.nextButton {
		transition: all 0.2s ease-in-out;
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1rem;
		height: 10vh;
	}

	.nextButton img {
		height: 10vh;
	}

	.endButton {
		transition: all 0.2s ease-in-out;
		height: 15vh;
	}

	.endButton img {
		height: 15vh;
	}

	.nextButton:hover {
		transform: scale(1.1) translateX(-1vw);
	}

	.nextButton:active {
		transform: scale(0.9) translateX(3vw);
	}

	.endButton:hover {
		transform: scale(1.1);
	}
	.endButton:active {
		transform: scale(0.9);
	}

	.recognizedText {
		font-size: 2vw;
		color: white;
		width: 70%;
		text-align: center;
		animation: whiteinout 2s infinite ease-in-out;
		margin-top: 1vh;
	}

	.notRecognizedText {
		font-size: 2vw;
		color: red;
		width: 70%;
		text-align: center;
		animation: redinout 2s infinite ease-in-out;
		margin-top: 1vh;
	}

	#dashboard {
		position: absolute;
		bottom: -10vh;
		left: -40vw;
		width: 110vw;
		max-width: none;
		z-index: -2;
	}

	#gpsglowing {
		position: absolute;
		width: 20vw;
		height: 15vw;
		left: calc(50% - 27vw);
		bottom: 0;
		z-index: 100;
		box-shadow: 0 0 1vw 0.5vw rgb(255, 150, 230);
		animation: gpsglow 2s infinite ease-in-out;
	}

	.grayfilter {
		position: fixed;
		z-index: -1;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.85);
	}


	@keyframes whiteinout {
		0% {
			color: white;
		}
		50% {
			color: rgba(255, 255, 255, 0.35);
		}
		100% {
			color: white;
		}
	}

	@keyframes redinout {
		0% {
			color: red;
		}
		50% {
			color: rgba(255, 0, 0, 0.35);
		}
		100% {
			color: red;
		}
	}

	@keyframes gpsglow {
		0% {
			background: none;
		}
		50% {
			background: rgba(255, 150, 230, 0.35);
		}
		100% {
			background: none;
		}
	}


	.commandBlock {
		z-index: 1;
		padding: 1vh;
		width: fit-content;
	}

	.commandBlock > .blockcontent p {
		margin-left: -3vh;
	}

	.commandBlock > .blockcontent {
		background: url('/img/misc/blockparts/commandm.png') repeat-x;
		height: 100%;
		background-size: 100% 100%;
		text-align: left;
		vertical-align: middle;
		line-height: 8vh;
		height: 8vh;
		clear: none;
		float: left;
	}

	.commandBlock .blockend {
		background: url('/img/misc/blockparts/commandr.png') no-repeat;
		background-size: auto 100%;
		width: 3vh;
		left: 100%;
		height: 8vh;
		bottom: 0;
		float: right;
	}

	.commandBlock .blockstart {
		background: url('/img/misc/blockparts/commandl.png') no-repeat;
		background-size: auto 100%;
		width: 7vh;
		right: 100%;            
		height: 8vh;
		bottom: 0;
		float: left;
	}

	.predicateBlock {
		z-index: 1;
		padding: 1vh;
		display: inline-block;
	}

	.predicateBlock .blockcontent p {
		background-color: #59C059;
		height: 100%;
		text-align: left;
		vertical-align: middle;
		line-height: 4vh;
		height: 5vh;
		margin-left: -0.05vh;
		margin-right: -0.05vh;
		border-top: 0.5vh solid #389438;
		border-bottom: 0.5vh solid #389438;
		padding-left: 1vh;
		padding-right: 1vh;
	}

	.predicateBlock .blockcontent {
		clear: none;
		float: left;
	}

	.predicateBlock .blockstart {
		background-color: #389438;
		width: 2.5vh;
		left: 100%;
		height: 5vh;
		bottom: 0;
		float: left;
		clip-path: polygon(100% 0, 0% 50%, 100% 100%);
	}

	.predicateBlock .blockstart::after {
		content: '';
		position: relative;
		top: 0.5vh;
		left: 0.66vh;
		width: calc(100% - 0.65vh);
		height: calc(100% - 1vh);
		background-color: #59C059;
		clip-path: polygon(100% 0, 0% 50%, 100% 100%);
		display: block;
	}

	.predicateBlock .blockend {
		background-color: #389438;
		width: 2.5vh;
		left: 100%;
		height: 5vh;
		bottom: 0;
		float: right;
		clip-path: polygon(0 0, 100% 50%, 0 100%);
	}

	.predicateBlock .blockend::after {
		content: '';
		position: relative;
		top: 0.5vh;
		left: 0;
		width: calc(100% - 0.66vh);
		height: calc(100% - 1vh);
		background-color: #59C059;
		clip-path: polygon(0 0, 100% 50%, 0 100%);
		display: block;
	}


	.predicateBlockSlot {
		z-index: 1;
		padding: 1vh;
		height: 5vh;
		display: inline-block;
		position: relative;
		left: -1vh;
		top: -0.5vh;
		margin-right: 4vh;
		min-width: 10vh;
		margin-left: 4vh;
		background-color: #9a9a9a;
	}

	.predicateBlockSlot::before {
		content: '';
		background-color: #9a9a9a;
		width: 2.5vh;
		position: relative;
		left: -3.45vh;
		height: 5vh;
		top: -1vh;
		float: left;
		clip-path: polygon(100% 0, 0% 50%, 100% 100%);
	}
	

	.predicateBlockSlot::after {
		content: '';
		background-color: #9a9a9a;
		width: 2.5vh;
		height: 5vh;
		position: relative;
		right: -3.45vh;
		height: 5vh;
		top: -1vh;
		float: right;
		clip-path: polygon(0 0, 100% 50%, 0 100%);
	}

	.commandBlockSlot {
		z-index: 1;
		padding: 1vh;
		height: 6vh;
		background: #9a9a9a;
		text-align: left;
		vertical-align: middle;
		min-width: 20vh;
	}

	:not(.ifBlock) .commandBlockSlot {
		width: 20vh;
	}

	.ifBlock {
		z-index: 1;
		padding: 1vh;
		min-height: 16vh;
	}

	.ifBlock .blockcontent span:first {
		margin-left: -3vh;
	}

	.ifBlock :global(.predicateBlock) {
		margin-left: 2vh;
		margin-right: 2vh; 
	}

	.ifBlock > * > .blockcontent {
		background: url('/img/misc/blockparts/iftopmiddle.png') repeat-x;
		background-size: 100% 100%;
		height: 100%;
		text-align: left;
		vertical-align: middle;
		line-height: 4vh;
		height: 8vh;
		clear: none;
		float: left;
		margin-left: -0.025vh;
		margin-right: -0.025vh;
		display: flex;
		align-items: center;
		gap: 1vh;
	}

	.ifBlock > * > .blockcontent span:first-child {
		margin-left: -5vh;
	}

	.ifBlock .blocktopend {
		background: url('/img/misc/blockparts/iftopend.png') no-repeat;
		background-size: auto 100%;
		width: 2.5vh;
		left: 100%;
		height: 8vh;
		bottom: 0;
		float: left;
	}

	.ifBlock .blocktopstart {
		background: url('/img/misc/blockparts/iftopstart.png') no-repeat;
		background-size: auto 100%;
		width: 9vh;
		right: 100%;
		height: 8vh;
		bottom: 0;
		float: left;
	}

	.ifBlock .blockstem {
		background: url('/img/misc/blockparts/ifstem.png') repeat-y;
		background-size: 100% 100%;
		min-height: 8vh;
		width: 2.55vh;
		left: 100%;
		bottom: 0;
		float: left;
	}

	.ifBlock .blockinner {
		clear: none;
		float: left;
	}

	.ifBlock > .blockend {
		background: url('/img/misc/blockparts/ifbottom.png') no-repeat;
		background-size: auto 100%;
		width: 45vh;
		left: 0;
		height: 6.2vh;
		bottom: 0;
		float: left;
		clear: both;
	}

	.ifBlock .blockinner :global(.commandBlock) {
		margin-top: -1.25vh;
		margin-left: 0.25vh;
	}

	.targetBlocks {
		display: flex;
		flex-direction: column;
		padding-left: 20vw;
	}

	.targetBlocks .ifBlock {
		padding: 0;
		margin-top: -0.75vh;
		margin-bottom: -0.75vh;
	}

	.palette {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20vw;
		background-color: rgba(0, 0, 0, 0.5);
		position: relative;
		left: 0;
		position: absolute;
	}

	#navButtons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	#navButtons button {
		width: 10vw;
		height: 10vh;
		transition: all 0.2s ease-in-out;
	}

	#navButtons button:hover {
		transform: scale(1.1);
	}

	#navButtons button:active {
		transform: scale(0.9);
	}

	#scanner {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 5vw;
	}

	#scannerimgs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#scannerimgs div { 
		cursor: pointer;
	}
</style>