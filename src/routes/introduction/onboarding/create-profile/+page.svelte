<script lang="ts">
	import { goto } from '$app/navigation';
	import Age from '$lib/components/sequences/tablet/create-profile/Age.svelte';
	import AgentName from '$lib/components/sequences/tablet/create-profile/AgentName.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import Interest from '$lib/components/sequences/tablet/create-profile/Interest.svelte';
	import Name from '$lib/components/sequences/tablet/create-profile/Name.svelte';
	import ClickToViewProfileBanner from '$lib/components/tablet/ClickToViewProfileBanner.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Student } from '$lib/types/UserData';
	import DataService from '$lib/utils/DataService';
	import { onDestroy, onMount } from 'svelte';
	import {  studentDataStore, studentProgressStore } from '$lib/utils/stores/store';
	import ProfilesApp from '$lib/components/tablet/profiles/ProfilesApp.svelte';
	import { get } from 'svelte/store';
	import AvatarCreator from '$lib/components/sequences/tablet/create-profile/AvatarCreator.svelte';

	const startPage: number = 3;
	let page: number = startPage;
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	const numberOfPageSequences = 7;

	let profileData: Student = get(studentDataStore);

	// Set the default values for the profile data
	if(profileData.interests == undefined || profileData.interests.length == 0) {
		profileData.interests = ['','',''];
	}


	studentDataStore.subscribe((value) => {
		profileData = value;

		if(profileData.interests == undefined || profileData.interests.length == 0) {
			profileData.interests = ['','',''];
		}
	});

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
	onDestroy(() => {
		mounted = false;
	});

	const validateData = () => {
		console.log(profileData);

		if (page === 1 && ((profileData.first_name ?? '') === '' || (profileData.last_name ?? '') === '')) {
			return false;
		} else if (page === 2 && (profileData.age ?? -1) <= 0) {
			return false;
		} else if (page > 2 && page < 6 && (profileData.interests ?? []).length < page-2) {
			return false;
		}  else if (page == 6 && (profileData.agent_name ?? '') === '') {
			return false;
		}
		return true;
	};

	/**
	 * Progress the user through the profile creation sequence
	 * @param direction NavigationDirection enum representing the direction of navigation
	 */
	const handleNavigation = (direction: NavigationDirection) => {
		// Set the agentData store, which will allow us to access this profile data across the application
		// agentData.set(profileData);

		if (direction == NavigationDirection.backward && page > startPage) {
			page--;
		} else if (direction == NavigationDirection.forward && page < numberOfPageSequences) {
			console.log("page: ",page)
			console.log("validate data: ", validateData())
			console.log("length:", (profileData.interests ?? []).length)

			if(validateData()) {
				page++;
			} else {
				switch (page) {
					case 1:
						alert("Please fill in your name before moving to the next page");
						break;
					case 2:
						alert("Please fill in your age before moving to the next page");
						break;
					case 3:
					case 4:
					case 5:
						alert("Please fill in your interests before moving to the next page");
						break;
					default:
						alert("Please fill in the required data before moving to the next page");
						break;
				}
			}
			
		}
	};

	const validateAgentName = () => {
		if(validateData()) {
			page++;
		} else {
			alert("Please fill in an Agent Name before moving to the next page")
		}
	}

	const handleSubmit = async () => {
		try {
			console.log('profileData before signup: ', profileData);

			await DataService.Student.updateStudent(profileData);

			message = 'Agent created successfully!';
			isSuccess = true;

			console.log('profileData after signup: ', profileData);
		} catch (error) {
			message = 'Agent creation failed!';
			isSuccess = false;
			console.error(error);
		}
		showFeedbackModal = true;
	};

	async function onFeedbackClose() {
		if (isSuccess) {
			studentProgressStore.update((data) => {
				data.last_visited = '/introduction/welcome?page=1';
				return data;
			});
			goto('/introduction/welcome?page=1');
		}
		showFeedbackModal = false;
	}

	let showAgentProfile = false;
</script>

<div class=" relative z-0 h-full w-full rounded-md">
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}
	{#if showAgentProfile}
		<div style="z-index: 1000;">
			<ProfilesApp handleClick={() => showAgentProfile = false} />
		</div>
	{/if}

	{#if !showAgentProfile}
		<div class="flex h-full  w-full rounded-md" style="z-index: -1;">
			<button
				class={`rotate-180 px-2 ${page <= 1 ? 'opacity-0' : ''}`}
				on:click={() => handleNavigation(NavigationDirection.backward)}>
				<img src="/img/svg/dialog-arrow-blue.svg" alt="" class="h-16 w-16" />
				<!-- <p class="bg-lapiz-blue text-white text-3xl w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p> -->
			</button>
			<div class="h-full w-full">
				{#if page == 1}
					<Name bind:profileData />
				{:else if page == 2}
					<Age bind:profileData />
				{:else if page == 3}
					<Interest bind:profileData prompt="What do you like to do?" index={0} />
				{:else if page == 4}
					<Interest bind:profileData prompt="Can you think of anything else?" index={1} />
				{:else if page == 5}
					<Interest bind:profileData prompt="One more thing you enjoy" index={2} />
					<!-- {:else if page == 6}
					<ChooseAnAvatar bind:profileData /> -->
				{:else if page == 6}
					<AgentName bind:profileData on:submitClicked={validateAgentName} />
				{:else if page == 7}
					<AvatarCreator bind:profileData on:submitClicked={handleSubmit} />
				{/if}
			</div>
			<button
				class={`px-2 ${page >= numberOfPageSequences ? 'opacity-0' : ''}`}
				on:click={() => handleNavigation(NavigationDirection.forward)}>
				<img src="/img/svg/dialog-arrow-blue.svg" alt="" class="h-16 w-16" />
			</button>
			{#if page == 3 || page == 4 || page == 5 || page == 6}
				<div class="absolute inset-0 z-10 mb-4 mt-auto flex  h-fit items-end justify-center  shadow-md" style="z-index: 1;">
					<ClickToViewProfileBanner handleClick={() => showAgentProfile = true} />
				</div>
			{/if}
		</div>
	{/if}
</div>
