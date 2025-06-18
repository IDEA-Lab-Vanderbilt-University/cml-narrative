<script>
	import { goto } from "$app/navigation";
	import Tablet from "../tablet/Tablet.svelte";

    export let currentStep;

    export let steps = [
        {name: "Design", icon: "/img/icons/robodesign.png"},
        {name: "Plan", icon: "/img/icons/roboplan.png"},
        {name: "Test & Train", icon: "/img/icons/robotrain.png"},
        {name: "Program", icon: "/img/icons/roboprogram.png"},
        {name: "Showcase", icon: "/img/icons/roboshowcase.png"}
    ];

    export let onStepClick;
</script>
<Tablet showMeter={false} showBottomButtons={false}>
    <div class="robostepsouter">
        <h2>Your Prototype</h2>
    </div>
    <div class="robostepsouter">
        <div class="robosteps">
            {#each steps as step, i}
                <div class="robostep {currentStep > i ? 'donestep' : ''} {currentStep == i ? 'nextstep' : ''}" on:click={() => {if(currentStep == i) { onStepClick(); }}} role="button" tabindex="-1">
                    <img src={step.icon} alt={step.name} />
                    <p>{step.name}</p>
                </div>
            {/each}
        </div>
    </div>
</Tablet>

<style>
    
	.robostepsouter {
		background: linear-gradient(90deg, rgb(137, 200, 225), rgb(100, 159, 200));
		width: 80%;
		margin: 0 auto;
		margin-bottom: 1vh;
		border-radius: 5vh;
		padding: 1.5vh;
	}

	.robostepsouter h2 {
		text-align: center;
		font-size: 6vh;
		color: black;
		font-weight: bold;
	}

    .robosteps {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 65vh;
		background-color: white;
		border-radius: 5vh;
	}

	.robostep {
		background-color: peachpuff;
		border-radius: 4vh;
		height: 9vh;
		width: 50%;
	}

	.robostep img {
		height: 11vh;
		position: relative;
		top: -1vh;
		left: -1vh;
		clear: none;
		float: left;
	}

	.robostep p {
		line-height: 9vh;
		position: relative;
		left: 2vh;
		font-size: 5vh;
		text-shadow: 0 0 1vh rgba(0, 0, 0, 0.4);
		user-select: none;
	}

	.robostep.donestep {
		background-color: rgb(4, 159, 4);
	}

	.robostep.nextstep {
		background-color: rgb(4, 159, 4);
		cursor: pointer;
		transition: all 0.3s;
		animation: infinite 2.5s linear alternate pulse;
	}

    .robostep:not(.nextstep) {
        cursor: default;
    }

	.robostep.nextstep:hover {
		background-color: rgb(3, 103, 3);
		transform: scale(1.05);
	}

	.robostep.nextstep:active {
		transform: scale(0.95);
	}

	.robostep.nextstep p, .robostep.donestep p {
		color: white;
	}
</style>