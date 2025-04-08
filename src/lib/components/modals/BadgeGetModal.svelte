<script lang="ts">
	import Tablet from "../tablet/Tablet.svelte";

    import type { Student } from '$lib/types/UserData';
    import { studentDataStore } from '$lib/utils/stores/store';
	import Badge from "../Badge.svelte";
    import { Confetti } from "svelte-confetti";
	import { get } from "svelte/store";

    export let handleClick: () => void;

    let agent: Student = get(studentDataStore);

    export let badgeName: string;
    export let badgeImage: string;

    let confetti = 0;
</script>

<Tablet showMeter={false}>
    <div class="text-center text-white text-3xl font-mokoto p-16">
        Congratulations, Agent {agent.agent_name}! <br/>
        You have earned another badge!
    </div>
    <div class="flex justify-center">    
        <Badge name={badgeName} image={badgeImage} onClick={() => { confetti++;}} />
    </div>
    <div class="flex justify-center">    
        {#key confetti}        
            <Confetti x={[-2, 2]} y={[-0.5, 1.0]} amount={100} />
        {/key}
    </div>
    <div class="flex justify-center">
        <button class="btn btn-primary" on:click={handleClick}>
            Close
        </button>
    </div>
</Tablet>

<style>

</style>