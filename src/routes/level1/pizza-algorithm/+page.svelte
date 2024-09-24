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
            {#if lineNumber == 1}
                <ul id="algo1" bind:this={algo1}>
                    {#each algorithmSteps as step, i}
                        <li class="step" style={algorithmStepStyles[i]}>
                            <p>{step}</p>
                        </li>
                    {/each}
                    
                </ul>
            {/if}        

            <div id="navButtons">
                <button id="nextButton" disabled on:click={() => handleNavigation(NavigationDirection.forward)}>
                    <img src="/img/misc/pizzasend.png" alt="Send" />
                </button>
            </div>
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
            margin: 1vh;
            padding: 1vh;
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
    </style>