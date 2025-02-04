<script lang="ts">
	export let threshold: number; // Default value in the middle of allowed range
	export let minThreshold: number = 70;

	// Constrain value between minThreshold and 100
	function handleInput(event: Event) {
		const value = parseInt((event.target as HTMLInputElement).value);
		threshold = Math.max(minThreshold, Math.min(100, value));
	}
</script>

<div class="threshold-container" style="--min-threshold: {minThreshold}%">
	<div class="value-display">{threshold}%</div>
	<div class="slider-description">
		<div class="slider-description-item">Easier to do</div>
		<div class="slider-description-item">Harder to do</div>
	</div>
	<input
		type="range"
		min="0"
		max="100"
		step="1"
		bind:value={threshold}
		on:input={handleInput}
		class="threshold-slider" />
	<div class="slider-description">
		<div class="slider-description-item">Not as good</div>
		<div class="slider-description-item">Does a good job</div>
	</div>
</div>

<style>
	.threshold-container {
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
	}

	.slider-description {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.slider-description-item {
		font-weight: bold;
		color: white;
	}

	.threshold-slider {
		width: 100%;
		background:
			repeating-linear-gradient(45deg, red, red 10px, #ff4444 10px, #ff4444 20px) 0 0 /
				var(--min-threshold) 100% no-repeat,
			linear-gradient(to right, #ff4444 var(--min-threshold), #3b82f6 100%) 100%;
		-webkit-appearance: none;
		height: 2vh;
		border-radius: 4px;
		outline: none;
	}

	/* Style the slider thumb */
	.threshold-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 2vh;
		height: 4vh;
		background: radial-gradient(farthest-corner at bottom right, #49c5ff 75%, #fff 100%);
		border-radius: 5px;
		border: 1.5px solid #289dd3;
		outline-color: white;
		cursor: pointer;
	}

	.threshold-slider::-moz-range-thumb {
		width: 2vh;
		height: 4vh;
		background: radial-gradient(farthest-corner at bottom right, #49c5ff 75%, #fff 100%);
		border-radius: 5px;

		border: 1.5px solid #289dd3;
		outline-color: white;
		cursor: pointer;
	}

	.value-display {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		background-color: white;
		padding: 0rem 1rem;
		border-radius: 5px;
	}
</style>
