<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Student } from '$lib/types/UserData';
	import type { ProfileStep } from './ProfileEditorTypes';
	
	// Profile editing components
	import Name from './Name.svelte';
	import Age from './Age.svelte';
	import Interest from './Interest.svelte';
	import AgentName from './AgentName.svelte';
	import AvatarCreator from './AvatarCreator.svelte';
	import ClickToViewProfileBanner from '$lib/components/tablet/ClickToViewProfileBanner.svelte';
	import ProfilesApp from '$lib/components/tablet/profiles/ProfilesApp.svelte';

	const dispatch = createEventDispatcher();

	// Props
	export let profileData: Student;
	export let startPage: number = 1;
	export let showProfileBanner: boolean = true;
	export let enableProfileViewing: boolean = true;
	export let showNavigation: boolean = true;
	export let showCancelButton: boolean = false;

	const steps: ProfileStep[] = [
		{
			id: 1,
			component: Name,
			validateFn: (data) => (data.first_name ?? '') !== '' && (data.last_name ?? '') !== '',
			errorMessage: "Please fill in your name before moving to the next page"
		},
		{
			id: 2,
			component: Age,
			validateFn: (data) => (data.age ?? -1) > 0,
			errorMessage: "Please fill in your age before moving to the next page"
		},
		{
			id: 3,
			component: Interest,
			props: { prompt: "What do you like to do?", index: 0 },
			validateFn: (data) => (data.interests ?? []).length >= 1 && (data.interests?.[0] ?? '') !== '',
			errorMessage: "Please fill in your interests before moving to the next page",
			showProfileBanner: true
		},
		{
			id: 4,
			component: Interest,
			props: { prompt: "Can you think of anything else?", index: 1 },
			validateFn: (data) => (data.interests ?? []).length >= 2 && (data.interests?.[1] ?? '') !== '',
			errorMessage: "Please fill in your interests before moving to the next page",
			showProfileBanner: true
		},
		{
			id: 5,
			component: Interest,
			props: { prompt: "One more thing you enjoy", index: 2 },
			validateFn: (data) => (data.interests ?? []).length >= 3 && (data.interests?.[2] ?? '') !== '',
			errorMessage: "Please fill in your interests before moving to the next page",
			showProfileBanner: true
		},
		{
			id: 6,
			component: AgentName,
			validateFn: (data) => (data.agent_name ?? '') !== '',
			errorMessage: "Please fill in an Agent Name before moving to the next page",
			showProfileBanner: true
		},
		{
			id: 7,
			component: AvatarCreator,
			validateFn: (data) => (data.avatar ?? '') !== '',
			errorMessage: "Please choose an avatar before submitting"
		}
	];

	// State
	let currentPage: number = startPage;
	let showAgentProfile = false;

	$: currentStep = steps.find(step => step.id === currentPage);
	$: numberOfSteps = steps.length;

	// Initialize profile data
	if (!profileData.interests || profileData.interests.length === 0) {
		profileData.interests = ['', '', ''];
	}

	/**
	 * Validate current step data
	 */
	const validateCurrentStep = (): boolean => {
		if (!currentStep?.validateFn) return true;
		return currentStep.validateFn(profileData);
	};

	/**
	 * Handle navigation between steps
	 */
	const handleNavigation = (direction: NavigationDirection) => {
		if (direction === NavigationDirection.backward && currentPage > startPage) {
			currentPage--;
			dispatch('stepChanged', { step: currentPage, direction });
		} else if (direction === NavigationDirection.forward && currentPage < numberOfSteps) {
			if (validateCurrentStep()) {
				currentPage++;
				dispatch('stepChanged', { step: currentPage, direction });
			} else {
				const errorMessage = currentStep?.errorMessage || "Please fill in the required data before moving to the next page";
				alert(errorMessage);
			}
		}
	};

	/**
	 * Handle special validation for agent name step
	 */
	const validateAgentName = () => {
		if (validateCurrentStep()) {
			currentPage++;
			dispatch('stepChanged', { step: currentPage, direction: NavigationDirection.forward });
		} else {
			alert("Please fill in an Agent Name before moving to the next page");
		}
	};

	/**
	 * Handle final submission
	 */
	const handleSubmit = () => {
		if (validateCurrentStep()) {
			dispatch('submit', { profileData });
		} else {
			const errorMessage = currentStep?.errorMessage || "Please complete all required fields";
			alert(errorMessage);
		}
	};

	/**
	 * Handle cancel action
	 */
	const handleCancel = () => {
		dispatch('cancel');
	};

	/**
	 * Handle profile banner click
	 */
	const handleProfileBannerClick = () => {
		if (enableProfileViewing) {
			showAgentProfile = true;
		}
	};
</script>

<div class="relative z-0 h-full w-full rounded-md">
	{#if showAgentProfile}
		<div style="z-index: 1000;">
			<ProfilesApp handleClick={() => showAgentProfile = false} />
		</div>
	{/if}

	{#if !showAgentProfile}
		<div class="flex h-full w-full rounded-md" style="z-index: -1;">
			<!-- Back Button -->
			{#if showNavigation}
				<button
					class={`rotate-180 px-2 ${currentPage <= startPage ? 'opacity-0' : ''}`}
					on:click={() => handleNavigation(NavigationDirection.backward)}>
					<img src="/img/svg/dialog-arrow-blue.svg" alt="Previous" class="h-16 w-16" />
				</button>
			{/if}

			<!-- Main Content -->
			<div class="h-full w-full">
				{#if currentStep}
					{#if currentStep.id === 6}
						<svelte:component 
							this={currentStep.component} 
							bind:profileData 
							{...currentStep.props || {}}
							on:submitClicked={validateAgentName} 
						/>
					{:else if currentStep.id === 7}
						<svelte:component 
							this={currentStep.component} 
							bind:profileData 
							{...currentStep.props || {}}
							on:submitClicked={handleSubmit} 
                            showCancelButton=true
                            on:cancel={handleCancel}
						/>
					{:else}
						<svelte:component 
							this={currentStep.component} 
							bind:profileData 
							{...currentStep.props || {}} 
						/>
					{/if}
				{/if}
			</div>

			<!-- Forward Button -->
			{#if showNavigation}
				<button
					class={`px-2 ${currentPage >= numberOfSteps ? 'opacity-0' : ''}`}
					on:click={() => handleNavigation(NavigationDirection.forward)}>
					<img src="/img/svg/dialog-arrow-blue.svg" alt="Next" class="h-16 w-16" />
				</button>
			{/if}

			<!-- Profile Banner -->
			{#if showProfileBanner && currentStep?.showProfileBanner && enableProfileViewing}
				<div class="absolute inset-0 z-10 mb-4 mt-auto flex h-fit items-end justify-center shadow-md" style="z-index: 1;">
					<ClickToViewProfileBanner handleClick={handleProfileBannerClick} />
				</div>
			{/if}

			<!-- Cancel Button -->
			{#if showCancelButton && currentStep?.id !== 7}
				<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
					<button 
						class="bg-red-500 rounded-md px-2 py-2 m-2 text-xl text-white shadow hover:shadow-lg"
						on:click={handleCancel}
					>
						Cancel
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
