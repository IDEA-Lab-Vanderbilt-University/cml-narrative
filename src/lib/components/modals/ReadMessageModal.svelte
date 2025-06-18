<script lang="ts">
	import { studentDataStore } from "$lib/utils/stores/store";
	import { get } from "svelte/store";
	import Tablet from "../tablet/Tablet.svelte";

    export let from = 'Captain Storm';
    export let onNext: () => void;
    export let ps: string[] = [];
    
    let agent = get(studentDataStore);

</script>

<Tablet showMeter={false}>
    <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen2">
        <h1 class="text-3xl w-10/12">Hello Agent {agent.agent_name},</h1>
        <slot></slot>
        <div class="w-10/12">
            {#if ps.length > 0}
                <div style="float: left;">
                    {#each ps as p}
                        <strong>{p}</strong><br/>
                    {/each}
                </div>
            {/if}
            <div class="text-3xl" style="float: right;">
                {from}
            </div>
        </div>
        <button on:click={onNext}>
            <img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
        </button>
    </div>
</Tablet>

<style>
    #nextbutton {
        height: 10vh;
        transition: transform 0.2s;
    }

    #nextbutton:hover {
        transform: scale(1.1);
    }

    #nextbutton:active {
        transform: scale(0.9);
    }

    #mailscreen2 {
        justify-items: center;
        align-items: center;
        height: 100%;
        gap: 1vh;
    }

    #nextbutton {
        height: 7vh;
        position: relative;
        left: 40vh;
    }
 
    #mailscreen2 {
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }

    :global(#mailscreen2 ul li) {
        list-style-type: disc;
        margin-left: 2vw;
    }
</style>