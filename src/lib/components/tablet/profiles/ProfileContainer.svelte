<!--
 /src/lib/components/tablet/profiles/ProfileContainer.svelte
 ProfileContainer.svelte
 cml-narrative
 
 Created by Ian Thompson on June 29th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	export let profile: {name: string, rank: string, favoriteBadge: string, img: string, interests: string[], canEdit: boolean};

	export let onEdit: () => void;
</script>

<div class="flex h-full w-full flex-col px-4 py-3">
	<h3 class="text-center font-mono  text-white" style="font-size: 5vh;">{profile.name}</h3>
	<div class="flex h-full items-center space-x-3">
		<div class="w-1/3 space-y-10">
			<div class="flex flex-col text-center ">
				<p class="font-mono text-xl text-white">SPOT Rank</p>
				<p class="text-white text-3xl">{profile.rank}</p>
			</div>
			<div class="flex flex-col text-center">
				{#if profile.favoriteBadge}
					<p class="font-mono text-xl text-white">Favorite Badge</p>
					<p class="text-white text-3xl">{profile.favoriteBadge}</p>
				{/if}
			</div>
		</div>
		<div class="flex flex-col gap-5 h-full w-1/3 items-center justify-center px-24">
			<!-- TODO: Make this look more like the specifications -->
			<div
				class="flex w-full items-center justify-center rounded-full border-4 border-blue-300 bg-white p-9 shadow-lg shadow-blue-200" id="profilepiccontainer" style="background: url('{profile.img}') white bottom center no-repeat;">
			</div>

		{#if profile.canEdit}
			<div class="flex justify-center">
				<button class="btn-primary btn" on:click={onEdit}>Edit Profile</button>
			</div>
		{/if}
		</div>
		<div class="flex h-full w-1/3 flex-col space-y-6">
			{#each profile.interests as interest}
				<div
					class="hud-red-blue-border flex h-full w-full flex-col items-center bg-slate-700 text-center text-xl text-white">
					<p>I like to:</p>
					<p class="mt-auto mb-auto text-2xl">{interest}</p>
				</div>
			{/each}
		</div>
	</div>
</div>


<style>
	#profilepiccontainer {
		width: calc(min(20vw, 20vh));
		height: calc(min(20vw, 20vh));
		background-color: white;
		background-position-y: bottom;
		background-position-x: center;
		background-repeat: no-repeat;
		background-size: contain !important;
	}
</style>
