<script lang="ts">
	import Tablet from "../tablet/Tablet.svelte";

    import type { Student } from '$lib/types/UserData';
    import { studentDataStore } from '$lib/utils/stores/store';
	import Badge from "../Badge.svelte";
    import { Confetti } from "svelte-confetti";

    export let handleClick: () => void;

    let agent: Student = {
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
            last_visited: '',
            lastUpdated: undefined
        }
    };

    studentDataStore.subscribe((value) => {
        agent = value as Student;
    });

    export let badgeName: string;
    export let badgeImage: string;
</script>

<Tablet showMeter={false}>
    <div class="text-center text-white text-3xl font-mokoto p-16">
        Congratulations, Agent {agent.agentName}! <br/>
        You have earned another badge!
    </div>
    <div class="flex justify-center">    
        <Badge name={badgeName} image={badgeImage} />
    </div>
    <div class="flex justify-center">    
        <Confetti x={[-2, 2]} y={[-0.5, 1.0]} amount={100} />
    </div>
    <div class="flex justify-center">
        <button class="btn btn-primary" on:click={handleClick}>
            Close
        </button>
    </div>
</Tablet>

<style>

</style>