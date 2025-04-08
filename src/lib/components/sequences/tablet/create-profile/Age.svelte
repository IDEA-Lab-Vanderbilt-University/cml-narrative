<script lang="ts">
	import type { Student } from '$lib/types/UserData';

	export let profileData: Student;
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-10">
	<h1 class="text-6xl text-white">How old are you?</h1>
	<div class="flex w-full justify-center space-x-7">
		<div class="form-control h-24 w-full max-w-xs">
			<input
				type="number"
				placeholder="9"
				class="input-bordered input h-full w-full font-mono text-4xl"
				bind:value={profileData.age} 
				min="1"
				max="100"
				/>
		</div>
	</div>
</div>
