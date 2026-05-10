<!--
 /src/routes/introduction/onboarding/create-profile/agent-spark-profile/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import ProfileContainer from '$lib/components/tablet/profiles/ProfileContainer.svelte';
	import ProfileEditor from '$lib/components/sequences/tablet/create-profile/ProfileEditor.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Student } from '$lib/types/UserData';
	import { Assets } from '$lib/utils/Assets';
	import { studentDataStore } from '$lib/utils/stores/store';
	import DataService from '$lib/utils/DataService';
	import { languageStore, t } from '$lib/utils/stores/languageStore';
	import type { Language } from '$lib/utils/translations';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	/**
	 * Represents which profile to view in the container
	 */
	let index = 0;
	let isEditingProfile = false;
	let currentLanguage: Language = 'en';

	let profileData: Student = get(studentDataStore);

	let profileExamples: {name: string, rank: string, favoriteBadge: string, img: string, interests: string[], canEdit: boolean}[] = [];

	const getBaseProfileExamples = (language: Language) => {
		if (language === 'es') {
			return [
				{
					name: 'Agente Gear',
					rank: 'Agente Senior',
					favoriteBadge: 'Domador de Robots',
					img: Assets.Characters.AgentGear.talking,
					interests: ['Montar motocicletas', 'Comer empanadas', 'Ver torneos de carreras de autos'],
					canEdit: false
				},
				{
					name: 'Agente Spark',
					rank: 'Agente Junior',
					favoriteBadge: 'Campeón de Código Scratch',
					img: Assets.Characters.AgentSpark.talking,
					interests: [
						'Construir computadoras y aprender cómo funcionan',
						'Leer libros de ciencia ficción',
						'Jugar videojuegos'
					],
					canEdit: false
				},
				{
					name: 'Agente Fern',
					rank: 'Agente Senior',
					favoriteBadge: 'As de Algoritmos',
					img: Assets.Characters.AgentFern.smile,
					interests: ['Regar mis plantas', 'Viajar a lugares nuevos', 'Tocar el piano'],
					canEdit: false
				},
				{
					name: 'Capitán Storm',
					rank: 'Capitán',
					favoriteBadge: 'Maestro de Aprendizaje Automático',
					img: Assets.Characters.CaptainStorm.yeah,
					interests: [
						'Ver tormentas eléctricas (¡cuando es seguro, claro!)',
						'Jugar voleibol',
						'Construir robots'
					],
					canEdit: false
				}
			];
		}

		return [
			{
				name: 'Agent Gear',
				rank: 'Senior Agent',
				favoriteBadge: 'Robot Wrangler',
				img: Assets.Characters.AgentGear.talking,
				interests: ['Ride motorcycles', 'Eat empanadas', 'Watch race car tournaments'],
				canEdit: false
			},
			{
				name: 'Agent Spark',
				rank: 'Junior Agent',
				favoriteBadge: 'Scratch Code Champion',
				img: Assets.Characters.AgentSpark.talking,
				interests: [
					'Build computers and learn how they work',
					'Read sci-fi books',
					'Play video games'
				],
				canEdit: false
			},
			{
				name: 'Agent Fern',
				rank: 'Senior Agent',
				favoriteBadge: 'Algorithm Ace',
				img: Assets.Characters.AgentFern.smile,
				interests: ['Water my plants', 'Travel to new places', 'Play piano'],
				canEdit: false
			},
			{
				name: 'Captain Storm',
				rank: 'Captain',
				favoriteBadge: 'Machine Learning Master',
				img: Assets.Characters.CaptainStorm.yeah,
				interests: [
					"Watch thunderstorms (when it's safe of course!)",
					'Play volleyball',
					'Build robots'
				],
				canEdit: false
			}
		];
	};

	const getStudentProfileExample = (student: Student, language: Language) => ({
		name: `${language === 'es' ? 'Agente' : 'Agent'} ${student.agent_name}`,
		rank:
			(student.progress?.badge_count ?? 0) > 4
				? language === 'es'
					? 'Agente Junior'
					: 'Junior Agent'
				: language === 'es'
					? 'Agente en Entrenamiento'
					: 'Agent in Training',
		favoriteBadge: '',
		img: student.avatar ?? '',
		interests: student.interests ?? ['', '', ''],
		canEdit: true
	});

	const refreshProfileExamples = () => {
		const localizedExamples = getBaseProfileExamples(currentLanguage);
		if (profileData.agent_name && profileData.agent_name !== '') {
			profileExamples = [getStudentProfileExample(profileData, currentLanguage), ...localizedExamples];
		} else {
			profileExamples = localizedExamples;
		}

		if (index > profileExamples.length - 1) {
			index = Math.max(profileExamples.length - 1, 0);
		}
	};

	languageStore.subscribe((lang) => {
		currentLanguage = lang;
		refreshProfileExamples();
	});

	refreshProfileExamples();

	let nextButton: HTMLButtonElement | void;
	let previousButton: HTMLButtonElement | void;

	const handleNavigation = (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward && index != profileExamples.length - 1) {
			index += 1;
		} else if (direction == NavigationDirection.backward && index != 0) {
			index -= 1;
		}

		// Update button enabled/disabled state
		updateButtons();
	};

	const handleEditProfile = () => {
		// Only allow editing if it's the student's profile (the last one in the array)
		const currentProfile = profileExamples[index];
		if (currentProfile.canEdit) {
			isEditingProfile = true;
		}
	};

	const handleProfileSubmit = async (event: CustomEvent) => {
		const { profileData: submittedData } = event.detail;
		
		try {
			console.log('Updating profile:', submittedData);
			await DataService.Student.updateStudent(submittedData);
			
			// Also send a travel log entry for the profile update
			await DataService.TravelLog.submitTravelLog({
				data: JSON.stringify(submittedData),
				description: 'profile_updated',
				status: 'complete'
			});
			
			// Update the store with the new data
			studentDataStore.set(submittedData);
			
			// Update the local student agent reference
			profileData = submittedData;
			refreshProfileExamples();
			
			// Exit edit mode
			isEditingProfile = false;
			
			console.log('Profile updated successfully');
		} catch (error) {
			console.error('Failed to update profile:', error);
			alert('Failed to update profile. Please try again.');
		}
	};

	const handleCancelEdit = () => {
		isEditingProfile = false;
	};

	const handleStepChanged = (event: CustomEvent) => {
		const { step, direction } = event.detail;
		console.log(`Profile edit step changed to ${step}, direction: ${direction}`);
	};

    export let handleClick: () => void;

    function updateButtons() {
        if (previousButton && nextButton) {
            if (index == 0) {
                previousButton.disabled = true;
            } else {
                previousButton.disabled = false;
            }

            if (index == profileExamples.length - 1) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
        }
    }

    onMount(() => {
        updateButtons();
    });
</script>

<div class="h-full">
	{#if isEditingProfile}
		<!-- Profile Editor Mode -->
		<div class="h-full flex flex-col">
			<div class="text-center py-4">
				<h2 class="text-3xl text-white font-mono">{$t('tablet.editYourProfile')}</h2>
			</div>
			<div class="flex-1">
				<ProfileEditor 
					bind:profileData
					startPage={3}
					showProfileBanner={false}
					enableProfileViewing={false}
					showCancelButton={true}
					on:submit={handleProfileSubmit}
					on:cancel={handleCancelEdit}
					on:stepChanged={handleStepChanged}
				/>
			</div>
		</div>
	{:else}
		<!-- Profile Viewing Mode -->
		<div class="h-5/6">
			<ProfileContainer 
				profile={profileExamples[index]} 
				onEdit={handleEditProfile} 
			/>
		</div>
		<div class="flex w-full flex-col items-center justify-center space-y-2">
			<div class="flex items-center justify-center space-x-6" id="navbuttons">
				<button
					disabled
					class="btn-primary btn"
					id="previous"
					on:click={() => handleNavigation(NavigationDirection.backward)}
				bind:this={previousButton}>{$t('tablet.previous')}</button>
				<button class="btn-primary btn" disabled on:click={() => handleNavigation(NavigationDirection.forward)}
					id="next" bind:this={nextButton}>
					{$t('tablet.next')}
				</button>
			</div>
			<button on:click={handleClick} class="btn-secondary btn">{$t('tablet.goBack')}</button>
		</div>
	{/if}
</div>

<style>
	button {
		width: 200px;
		font-size: 1.25rem;
		height: 2rem;
		min-height: fit-content;
	}
</style>