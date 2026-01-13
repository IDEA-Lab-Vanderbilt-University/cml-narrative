<script lang="ts">
	import { languageStore, setLanguage } from '$lib/utils/stores/languageStore';

	type Language = {
		code: string;
		name: string;
		flag: string; // Can be emoji or image path
	};

	const languages: Language[] = [
		{ code: 'en', name: 'English', flag: "🇺🇸🇬🇧" },
		{ code: 'es', name: 'Español', flag: "🇪🇸🇲🇽" },
        // { code: 'fr', name: 'Français', flag: "🇫🇷" },
        // { code: 'de', name: 'Deutsch', flag: "🇩🇪" },
        // { code: 'zh', name: '中文', flag: "🇨🇳" },
        // { code: 'ja', name: '日本語', flag: "🇯🇵" },
        // { code: 'ko', name: '한국어', flag: "🇰🇷" },
        // { code: 'it', name: 'Italiano', flag: "🇮🇹" },
        // { code: 'pt', name: 'Português', flag: "🇵🇹🇧🇷" },
        // { code: 'ru', name: 'Русский', flag: "🇷🇺" },
	];


	export let dropdownDirection: 'up' | 'down' = 'up';

	let isOpen = false;

	$: currentLanguage = languages.find(lang => lang.code === $languageStore) || languages[0];

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectLanguage(code: string) {
		setLanguage(code as any);
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.language-menu')) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-menu">
	<button class="language-button" on:click|stopPropagation={toggleDropdown}>
		<span class="flag">{currentLanguage.flag}</span>
		<span class="code">{currentLanguage.code.toUpperCase()}</span>
	</button>

	{#if isOpen}
		<div class="dropdown {dropdownDirection === 'up' ? 'dropdown-up' : 'dropdown-down'}">
			{#each languages as language}
				<button
					class="dropdown-item"
					class:selected={language.code === $languageStore}
					on:click|stopPropagation={() => selectLanguage(language.code)}
				>
					<span class="flag">{language.flag}</span>
					<span class="code">{language.code.toUpperCase()}</span>
					<span class="name">{language.name}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.language-menu {
		position: relative;
		display: inline-block;
	}

	.language-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 4rem;
		height: 4rem;
		border: 2px solid #ddd;
		border-radius: 0.75rem;
		background: white;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0.5rem;
	}

	.language-button:hover {
		background: #f5f5f5;
		border-color: #999;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.language-button:active {
		transform: translateY(0);
	}

	.flag {
		font-size: 1.5rem;
		line-height: 1;
	}

	.code {
		font-size: 0.75rem;
		font-weight: 600;
		color: #333;
	}

	.dropdown {
		position: absolute;
		left: 0;
		min-width: 12rem;
		background: white;
		border: 2px solid #ddd;
		border-radius: 0.75rem;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
		overflow: hidden;
		z-index: 1000;
	}

	.dropdown-up {
		bottom: 100%;
		margin-bottom: 0.5rem;
	}

	.dropdown-down {
		top: 100%;
		margin-top: 0.5rem;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.75rem 1rem;
		border: none;
		background: white;
		cursor: pointer;
		transition: background 0.15s ease;
		text-align: left;
	}

	.dropdown-item:hover {
		background: #f0f0f0;
	}

	.dropdown-item.selected {
		background: #e3f2fd;
	}

	.dropdown-item .flag {
		font-size: 1.5rem;
	}

	.dropdown-item .code {
		font-size: 0.875rem;
		font-weight: 600;
		color: #666;
		min-width: 2rem;
	}

	.dropdown-item .name {
		font-size: 0.875rem;
		color: #333;
		flex: 1;
	}
</style>