<script lang="ts">
	import Tablet from "../tablet/Tablet.svelte";

    import type { UserData } from '$lib/types/UserData';
    import { userDataStore } from '$lib/utils/stores/store';
	import Badge from "../Badge.svelte";
    import { Confetti } from "svelte-confetti";
	import MegaJoulesMeter from "../tablet/MegaJoulesMeter.svelte";

    export let handleClick: () => void;

    let agent: UserData = {
        name: {
            first: '',
            last: ''
        },
        age: 0,
        interests: [],
        avatarImg: '',
        agentName: '',
        email: '',
        password: '',
        progress: {
            level: 0,
            levelLabel: '',
            subLevel: 0,
            subLevelLabel: '',
            lastUpdated: undefined
        }
    };

    userDataStore.subscribe((value) => {
        agent = value as UserData;
    });

    export let amount: number;


    let imageAmount = Math.floor(amount * 14 / 100);
</script>

<Tablet showMeter={false}>
    <div class="text-center text-white text-3xl font-mokoto p-16">
        You earned {amount} Megajoules!
    </div>
    <div class="flex justify-center h-1/3">  
    	<img src={`/img/tablet/meter/meter-${imageAmount}.svg`} alt="{amount} Megajoules" />
    </div>
    <div class="flex justify-center">    
        <Confetti x={[-2, 2]} y={[-0.5, 1.0]} amount={100} colorRange={[40, 50]} />
    </div>
    <div class="flex justify-center">
        <button class="btn btn-primary" on:click={handleClick}>
            Close
        </button>
    </div>
</Tablet>

<style>

</style>