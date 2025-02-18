<svelte:document />

<script lang="ts">
        import { goto } from '$app/navigation';
        import PizzaDialogBox from '$lib/components/activities/pizza-time/PizzaDialogBox.svelte';
        import Scene from '$lib/components/scene/Scene.svelte';
        import { NavigationDirection } from '$lib/types/Enums';
        import type { Line } from '$lib/types/Script';
        import type { StudentProgress } from '$lib/types/UserData.js';
        import DataService from '$lib/utils/DataService/index.js';
        import { userDataStore } from '$lib/utils/stores/store.js';
        import { createEventDispatcher, onMount } from 'svelte';
        import Sortable from 'sortablejs';
        import { fade } from 'svelte/transition';

        export let data;

        let line: Line;
        let lineNumber: number;

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
            // if (direction == NavigationDirection.forward) {
            //     if (line.id == 14) {
            //         let progress = getUpdatedProgress();
            //         await DataService.Data.updateUserProgress(progress);
            //         updateLocalProgress(progress)
                    
            //         // Next level
            //         goto('/level1/outro?page=1');
            //     } else {
            //         goto(`/level1/pizza-algorithm?page=${line.id + 1}`);
            //     }
            // } else if (direction == NavigationDirection.backward && line.id > 1) {
            //     goto(`/level1/pizza-algorithm?page=${line.id - 1}`);
            // }
        };

        let content: HTMLElement | void;

        let algorithmSteps = [
            "Place the flattened dough on a pizza baking board and spread pizza sauce evenly on the dough.",
            "Add desired topping on crust.",
            "Place pizza in preheated oven set at 350 degrees.",
            "Allow pizza to cook for 10 minutes or until crust is golden.",
            "Use robotic arms to carefully remove the pizza from the oven.",
            "Allow the pizza to cool for 5 minutes. Use the pizza cutter to slice the pizza into 8 equal triangular slices.",
            "Give customer pizza and napkins."
        ];

        // Used to provide a nice set of colors to be randomly assigned to the algorithm steps
        let algorithmStepStyles = [
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(0deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(45deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(90deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(135deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(180deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(225deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(270deg);"
        ];

        // Shuffle the algorithm styles
        for (let i = algorithmStepStyles.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [algorithmStepStyles[i], algorithmStepStyles[j]] = [algorithmStepStyles[j], algorithmStepStyles[i]];
        }

        let algorithmIndices = [0, 1, 2, 3, 4, 5, 6];
        let algorithmRandomIndices = [];
        
        // Shuffle the algorithm steps
        for (let i = algorithmIndices.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [algorithmIndices[i], algorithmIndices[j]] = [algorithmIndices[j], algorithmIndices[i]];
        }

        for (let i = 0; i < algorithmIndices.length; i++) {
            algorithmRandomIndices.push(algorithmIndices[i]);
        }

        // This is the sortable list for the algorithm steps
        let algo1: HTMLElement | void;

        $: if (algo1) {
            let sortable = new Sortable(algo1, {
                animation: 150,
                ghostClass: 'bg-jet',
                onEnd: (event) => {
                    
                }
            });
        }

        // The pairs of predicates and commands for the Parsons Problem
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

        const validateParsonsProblem = () => {
            let ifs = document.querySelectorAll('.ifBlock');
            let correct = true;

            for(let i = 0; i < ifs.length; i++) {
                // Check if the predicate and command slots are filled
                let predicateSlot = ifs[i].querySelector('.predicateBlock');
                let commandSlot = ifs[i].querySelector('.commandBlock');

                if(predicateSlot && commandSlot) {
                    // Check if the predicate and command slots are filled with the correct blocks
                    let predicate = predicateSlot.querySelector('.blockcontent p') as HTMLElement;
                    let command = commandSlot.querySelector('.blockcontent p') as HTMLElement;

                    if(predicate && command) {
                        if(predicate.innerText != parsonsPairs[i][0] || command.innerText != parsonsPairs[i][1]) {
                            correct = false;
                            break;
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

            if (correct) {
                goto('/level1/pizza-algorithm?page=6');
            } else {
                goto('/level1/pizza-algorithm?page=5');
            }
        };

        const getStepStyle = (step: string) => {
            let index = algorithmSteps.indexOf(step);

            if (index == -1) {
                return 'filter: drop-shadow(0 0 0.75rem black) hue-rotate(' + Math.floor(Math.random() * 360) + 'deg);';
            }

            return algorithmStepStyles[index];
        };

    </script>

    <Scene background={line.background} audio={line.audio}>
        <div class="w-full" id="dialogue" slot="dialog">
            <PizzaDialogBox {line} on:dialogEvent={handleDialogEvent} />
        </div>
        <div slot="content"  id="content"  bind:this={content}>

            {#if lineNumber == 1 || lineNumber == 2 || lineNumber == 3}
                <ul id="algo1" bind:this={algo1}>
                    {#each algorithmRandomIndices as i, index}
                        <li class="step" style={getStepStyle(algorithmSteps[i])}>
                            <p>{algorithmSteps[i]}</p>
                        </li>
                    {/each}
                </ul>
                {#if lineNumber == 3}
                    <div id="navButtons">
                        <button id="nextButton" on:click={() => goto('/level1/pizza-algorithm?page=4')}>
                            <img src="/img/misc/pizzanext.png" alt="Send" />
                        </button>
                    </div>
                {:else}
                    <div id="navButtons">
                        <button id="nextButton" on:click={() => {
                            if(!algo1) return;

                            // Validate the order of the steps
                            let steps = algo1.querySelectorAll('.step');

                            let correct = true;
                            for (let i = 0; i < steps.length; i++) {
                                let step = steps[i];
                                
                                if (step instanceof HTMLElement && step.innerText != algorithmSteps[i]) {
                                    correct = false;
                                    console.log('Incorrect step at index', i, step.innerText, algorithmSteps[i]);
                                    break;
                                }
                            }

                            if (correct) {
                                goto('/level1/pizza-algorithm?page=3');
                            } else {
                                goto(`/level1/pizza-algorithm?page=2`);
                            }
                        }}>
                            <img src="/img/misc/pizzasend.png" alt="Send" />
                        </button>
                    </div>
                {/if}
            {/if}
            {#if lineNumber == 4 || lineNumber == 5 || lineNumber == 6}
                <div class="palette" bind:this={palette} on:drop={paletteDrop} on:dragover={(e) => e.preventDefault()} role="list">
                    {#each parsonsPairs as pair}
                        <div class="predicateBlock" draggable="true" role="listitem"
                        on:dragstart={blockDragHandler}
                        >
                            <div class="blockstart" />
                            <div class="blockcontent">
                                <p>{pair[0]}</p>
                            </div>
                            <div class="blockend" />
                        </div>

                        <div class="commandBlock" draggable="true" role="listitem"            
                        on:dragstart={blockDragHandler}>
                            <div class="blockstart" />
                            <div class="blockcontent">
                                <p>{pair[1]}</p>
                            </div>
                            <div class="blockend" />
                        </div>
                    {/each}

                </div>

                <div class="targetBlocks">
                    {#each parsonsPairs as pair}
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
                    {/each}

                    {#if lineNumber == 6}
                        <div id="navButtons">
                            <button id="nextButton" on:click={() => goto('/level1/outro?page=1')}>
                                <img src="/img/misc/pizzanext.png" alt="Send" />
                            </button>
                        </div>
                    {:else}
                        <div id="navButtons">
                            <button id="nextButton" on:click={validateParsonsProblem}>
                                <img src="/img/misc/pizzasend.png" alt="Send" />
                            </button>
                        </div>
                    {/if}
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
            background: url('/img/backgrounds/cuttingboard.png') no-repeat;
            background-position-x: 95%;
            background-position-y: center;
            background-size: 100vw 105vh;
        }

        #navButtons {
            position: absolute;
            right: 1vw;
            bottom: 10vh;
            width: 100%;
            max-height: 8vh;
        }

        #nextButton {
            transition: all 0.3s;
            position: absolute;
            right: 0;
            height: 8vh;
        }

        #nextButton:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
        }

        #nextButton:active {
            transform: scale(0.9);
            filter: brightness(0.9);
        }

        #nextButton img {
            height: 100%;
        }

        .step {
            margin: 0.75vh;
            padding: 0.75vh;
            height: 8vh;
            display: table;
            width: 40vw;
            text-align: center;
            background: repeating-linear-gradient(
            -45deg,
            #ff7373,
            #ff7373 10px,
            #db4a4a 10px,
            #db4a4a 20px
            );
            border-radius: 3vh;
            border: 0.5vh solid #454545;
        }

        .step p {
            display: table-cell;
            vertical-align: middle;
            font-size: 1.5rem;
            font-family: 'Cantora One', sans-serif;
            color: white;
            text-shadow: 0 0 0.1em black;
            -webkit-text-stroke: 0.02rem #000;
            height: 100%;
            user-select: none;
        }

        .commandBlock {
            z-index: 1;
            padding: 1vh;
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
            line-height: 5vh;
            height: 6vh;
            clear: none;
            float: left;
        }

        .commandBlock .blockend {
            background: url('/img/misc/blockparts/commandr.png') no-repeat;
            background-size: auto 100%;
            width: 2.5vh;
            left: 100%;
            height: 6vh;
            bottom: 0;
            float: right;
        }

        .commandBlock .blockstart {
            background: url('/img/misc/blockparts/commandl.png') no-repeat;
            background-size: auto 100%;
            width: 5vh;
            right: 100%;            
            height: 6vh;
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
            min-height: 6vh;
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
    </style>