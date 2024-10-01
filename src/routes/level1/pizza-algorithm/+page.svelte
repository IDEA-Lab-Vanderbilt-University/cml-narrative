    <script lang="ts">
        import { goto } from '$app/navigation';
        import PizzaDialogBox from '$lib/components/activities/pizza-time/PizzaDialogBox.svelte';
        import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';
        import DialogBox from '$lib/components/dialog/DialogBox.svelte';
        import DefinitionModal from '$lib/components/modals/DefinitionModal.svelte';
        import Scene from '$lib/components/scene/Scene.svelte';
        import TabletButton from '$lib/components/tablet/TabletButton.svelte';
        import script from '$lib/scripts/introduction/script.js';
        import { NavigationDirection } from '$lib/types/Enums';
        import type { Line } from '$lib/types/Script';
        import type { UserProgress } from '$lib/types/UserData.js';
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

        const getUpdatedProgress = ():UserProgress => {
            return {
                level: 0,
                levelLabel: 'level-one',
                subLevel: 0,
                subLevelLabel: '/level1?page=1',
                lastUpdated: new Date()
            };
        }

        const updateLocalProgress = (progress: UserProgress) => {
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
                if (line.id == 14) {
                    let progress = getUpdatedProgress();
                    await DataService.Data.updateUserProgress(progress);
                    updateLocalProgress(progress)
                    
                    // Next level
                    goto('/level1/outro?page=1');
                } else {
                    goto(`/level1/pizza-algorithm?page=${line.id + 1}`);
                }
            } else if (direction == NavigationDirection.backward && line.id > 1) {
                goto(`/level1/pizza-algorithm?page=${line.id - 1}`);
            }
        };

        let content: HTMLElement | void;

        let algorithmSteps = [
            "Place the flattened dough on a pizza baking board and spread pizza sauce evenly on the dough.",
            "Add desired topping on crust.",
            "Place pizza in preheated oven set at 350 degrees.",
            "Allow pizza to cook for 10 minutes or until crust is golden.",
            "Use robotic arms to carefully remove the pizza from the oven.",
            "Allow the pizza to cool for 5 minutes.  Use the pizza cutter to slice the pizza into  8 equal triangular slices.",
            "Give customer pizza and napkins."
        ];

        let algorithmStepStyles = [
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(0deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(45deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(90deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(135deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(180deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(225deg);",
            "filter: drop-shadow(0 0 0.75rem black) hue-rotate(270deg);"
        ];

        let algorithmIndices = [0, 1, 2, 3, 4, 5, 6];
        let algorithmRandomIndices = [];
        
        for (let i = algorithmIndices.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [algorithmIndices[i], algorithmIndices[j]] = [algorithmIndices[j], algorithmIndices[i]];
        }

        for (let i = 0; i < algorithmIndices.length; i++) {
            algorithmRandomIndices.push(algorithmIndices[i]);
        }

        let algo1: HTMLElement | void;

        $: if (lineNumber == 1 && algo1) {
            let sortable = new Sortable(algo1, {
                animation: 150,
                ghostClass: 'bg-jet',
                onEnd: (event) => {
                    
                }
            });
        }
    </script>

    <Scene background={line.background} audio={line.audio}>
        <div class="w-full" id="dialogue" slot="dialog">
            <PizzaDialogBox {line} on:dialogEvent={handleDialogEvent} />
        </div>
        <div slot="content"  id="content"  bind:this={content}>

            {#if lineNumber == 1 || lineNumber == 2 || lineNumber == 3}
                <ul id="algo1" bind:this={algo1}>
                    {#each algorithmRandomIndices as i}
                        <li class="step" style={algorithmStepStyles[i]}>
                            <p>{algorithmSteps[i]}</p>
                        </li>
                    {/each}
                </ul>
                
                <div id="navButtons">
                    <button id="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
                        <img src="/img/misc/pizzasend.png" alt="Send" />
                    </button>
                </div>
            {/if}
            {#if lineNumber == 4}
            <!--
                <div class="commandBlock" draggable="true">
                    <div class="blockstart" />
                    <div class="blockcontent">
                        <p>Add cheese</p>
                    </div>
                    <div class="blockend" />
                </div>
                
                <div class="predicateBlock" draggable="true">
                    <div class="blockstart" />
                    <div class="blockcontent">
                        <p>Cheese requested</p>
                    </div>
                    <div class="blockend" />
                </div>

                <div class="ifBlock" draggable="true">
                    <div style="clear: both;">
                        <div class="blocktopstart" />
                        <div class="blockcontent">
                            <p>If blah blah blah then</p>
                        </div>
                        <div class="blocktopend" />
                    </div>
                    <div style="clear: both;">
                        <div class="blockstem" />
                        <div class="blockinner">
                            <p>Do it</p>
                        </div>
                    </div>
                    <div class="blockend" />
                </div>
            -->
            <div class="predicateBlock" draggable="true" role="listitem"
            on:dragstart={(e) => {
                console.log('dragstart', e);
                if (e.dataTransfer && e.target && e.target instanceof HTMLElement) {
                    e.dataTransfer.dropEffect = 'move';
                    e.dataTransfer.setData('text/plain', e.target.outerHTML);
                }
            }}
            >
                <div class="blockstart" />
                <div class="blockcontent">
                    <p>Cheese requested</p>
                </div>
                <div class="blockend" />
            </div>

            <div class="commandBlock" draggable="true" role="listitem"            
            on:dragstart={(e) => {
                console.log('dragstart', e);
                if (e.dataTransfer && e.target && e.target instanceof HTMLElement) {
                    e.dataTransfer.dropEffect = 'move';
                    e.dataTransfer.setData('text/plain', e.target.outerHTML);
                }
            }}>
                <div class="blockstart" />
                <div class="blockcontent">
                    <p>Add cheese to pizza</p>
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
                            on:drop={(e) => {
                                console.log('drop', e);
                                if(e.dataTransfer && e.dataTransfer.getData('text/plain') && e.target instanceof HTMLElement) {
                                    if(e.dataTransfer.getData('text/plain').includes('predicateBlock')) {
                                        let t = e.target;
                                        while(t.parentElement instanceof HTMLElement && !t.classList.contains('slot')) {
                                            t = t.parentElement;
                                        }

                                        if(t instanceof HTMLElement) {
                                            if(!t.classList.contains('slotDropped')) {
                                                t.innerHTML = e.dataTransfer.getData('text/plain');
                                                t.children[0].style['padding'] = '0';
                                                t.style['padding'] = '0';
                                                t.classList.add('slotDropped');
                                                t.classList.remove('predicateBlockSlot');
                                            }
                                        }
                                    }
                                }
                                e.preventDefault();
                            }}
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
                            <div class="commandBlockSlot"  role="listitem"
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

                            on:drop={(e) => {
                                console.log('drop', e);
                                if(e.dataTransfer && e.dataTransfer.getData('text/plain') && e.target instanceof HTMLElement) {
                                    if(e.dataTransfer.getData('text/plain').includes('commandBlock')) {
                                        let t = e.target;
                                        while(t.parentElement instanceof HTMLElement && !t.classList.contains('commandBlockSlot')) {
                                            t = t.parentElement;
                                        }

                                        if(t instanceof HTMLElement) {
                                            if(!t.classList.contains('slotDropped')) {
                                                t.innerHTML = e.dataTransfer.getData('text/plain');
                                                t.children[0].style['padding'] = '0';
                                                t.style['padding'] = '0';
                                                t.classList.add('slotDropped');
                                                t.classList.remove('commandBlockSlot');
                                            }
                                        }
                                    }
                                }
                                e.preventDefault();
                            }}
                            />
                        </div>
                    </div>
                    <div class="blockend" />
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
            margin-left: -0.025vh;
            margin-right: -0.025vh;
            border-top: 0.5vh solid #389438;
            border-bottom: 0.5vh solid #389438;
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
            left: 0.65vh;
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
            width: calc(100% - 0.65vh);
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
    </style>