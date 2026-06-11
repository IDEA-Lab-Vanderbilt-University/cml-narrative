<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import DataService from '$lib/utils/DataService';
	import { settingsStore } from '$lib/utils/stores/store';

	export let assistantId = '';
	export let title = 'SPOT BOT';
	export let className = '';
	export let preserveSpeechPunctuation = false;

	type Message = {
		sender: 'user' | 'bot';
		text: string;
	};

	let minimized = true;
	let loading = false;
	let errorMessage = '';
	let input = '';
	let messages: Message[] = [];
	let canUseSpeechToText = false;
	let isRecording = false;
	let recognition: any = null;
	let canUseReadAloud = false;
	let speakingMessageKey: string | null = null;
	let microphoneDetectedLanguage: 'en-US' | 'es-ES' | null = null;
	let activeVoiceLanguage: 'en-US' | 'es-ES' = 'en-US';
	let availableSpeechVoices: SpeechSynthesisVoice[] = [];

	$: {
		const defaultVoiceLanguage = $settingsStore?.language === 'es' ? 'es-ES' : 'en-US';
		activeVoiceLanguage = microphoneDetectedLanguage ?? defaultVoiceLanguage;
	}

	const getSpeechRecognition = () => {
		if (!browser) return null;
		// @ts-ignore
		return window.SpeechRecognition || window.webkitSpeechRecognition || null;
	};

	const refreshSpeechVoices = () => {
		if (!browser || !window.speechSynthesis) return;
		availableSpeechVoices = window.speechSynthesis.getVoices();
	};

	const getPreferredReadAloudVoice = (language: 'en-US' | 'es-ES'): SpeechSynthesisVoice | null => {
		if (!browser || !window.speechSynthesis) return null;

		const voices = availableSpeechVoices.length ? availableSpeechVoices : window.speechSynthesis.getVoices();
		const languagePrefix = language.startsWith('es') ? 'es' : 'en';
		const languageVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith(languagePrefix));

		if (!languageVoices.length) return null;

		// Prefer female voices for both English and Spanish
		const preferredFemaleVoiceNames = [
			'victoria',
			'samantha',
			'moira',
			'fiona',
			'karen',
			'zira',
			'susan',
			'anna',
			'catherine',
			'elena',
			'google uk english female',
			'google us english female',
			'google español',
			'conchi'
		];

		const matched = languageVoices.find((voice) => {
			const voiceName = voice.name.toLowerCase();
			return preferredFemaleVoiceNames.some((preferredName) => voiceName.includes(preferredName));
		});

		if (matched) {
			return matched;
		}

		// If no preferred female voice found, filter for female voices by checking voice object
		const femaleVoices = languageVoices.filter((voice) => {
			const voiceName = voice.name.toLowerCase();
			return !voiceName.includes('male') && !['david', 'mark', 'guy', 'james', 'ryan', 'matthew', 'george', 'benjamin', 'daniel', 'alex'].some(m => voiceName.includes(m));
		});

		if (femaleVoices.length > 0) {
			return femaleVoices[0];
		}

		return languageVoices[0];
	};

	onMount(() => {
		canUseSpeechToText = Boolean(getSpeechRecognition());
		canUseReadAloud = Boolean(browser && window.speechSynthesis && window.SpeechSynthesisUtterance);

		if (canUseReadAloud && browser && window.speechSynthesis) {
			refreshSpeechVoices();
			window.speechSynthesis.onvoiceschanged = refreshSpeechVoices;
		}

		return () => {
			if (browser && window.speechSynthesis) {
				window.speechSynthesis.onvoiceschanged = null;
			}
		};
	});

	const toggleMinimized = () => {
		if (!minimized && isRecording) {
			stopVoiceInput();
		}
		stopReadAloud();
		minimized = !minimized;
	};

	const extractBotText = (payload: any): string => {
		if (!payload) return 'No response received.';
		return (
			payload.response ??
			payload.reply ??
			payload.message ??
			payload.output ??
			payload.text ??
			'No response received.'
		);
	};

	const sendMessage = async () => {
		if (!input.trim() || loading) return;

		if (isRecording) {
			stopVoiceInput();
		}

		const prompt = input.trim();
		const historyForRequest = [
			...messages.map((message) => ({
				role: message.sender === 'user' ? 'user' : 'assistant',
				content: message.text
			})),
			{ role: 'user' as const, content: prompt }
		];

		messages = [...messages, { sender: 'user', text: prompt }];
		input = '';
		errorMessage = '';
		loading = true;

		try {
			const data = await DataService.Assistant.studentChat({
				assistant_id: assistantId,
				prompt,
				conversation_history: historyForRequest
			});
			messages = [...messages, { sender: 'bot', text: extractBotText(data) }];
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Chatbot is unavailable right now.';
			errorMessage = message;
		} finally {
			loading = false;
		}
	};

	const startVoiceInput = () => {
		if (!canUseSpeechToText) {
			errorMessage = 'Voice input is not supported in this browser.';
			return;
		}

		if (recognition) {
			recognition.stop();
			recognition = null;
		}

		const SpeechRecognition = getSpeechRecognition();
		if (!SpeechRecognition) {
			errorMessage = 'Voice input is not supported in this browser.';
			return;
		}

		const initialInput = input.trim();
		const inputPrefix = initialInput.length ? `${initialInput} ` : '';
		let finalTranscript = '';

		recognition = new SpeechRecognition();
		recognition.lang = activeVoiceLanguage;
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.onresult = (event: any) => {
			let interimTranscript = '';
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += `${transcript.trim()} `;
				} else {
					interimTranscript += transcript;
				}
			}

			const combinedTranscript = `${inputPrefix}${finalTranscript}${interimTranscript}`.trimStart();
			input = combinedTranscript;

			const detectedLanguage = detectReadAloudLanguage(combinedTranscript);
			if (microphoneDetectedLanguage !== detectedLanguage) {
				microphoneDetectedLanguage = detectedLanguage;
			}
		};

		recognition.onerror = (event: any) => {
			if (event?.error && event.error !== 'aborted') {
				errorMessage = 'Voice input failed. Please try again.';
			}
			isRecording = false;
		};

		recognition.onend = () => {
			isRecording = false;
			recognition = null;
			input = input.trim();
		};

		errorMessage = '';
		recognition.start();
		isRecording = true;
	};

	const stopVoiceInput = () => {
		if (recognition) {
			recognition.stop();
		}
		isRecording = false;
	};

	const toggleVoiceInput = () => {
		if (loading) return;
		if (isRecording) {
			stopVoiceInput();
		} else {
			startVoiceInput();
		}
	};

	const stopReadAloud = () => {
		if (!browser || !window.speechSynthesis) return;
		window.speechSynthesis.cancel();
		speakingMessageKey = null;
	};

	const sanitizeTextForSpeech = (text: string): string => {
		const withoutEmoji = text
			.replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, ' ')
			.replace(/[#*0-9]\uFE0F?\u20E3/gu, ' ')
			.replace(/[\p{Extended_Pictographic}]/gu, ' ')
			.replace(/[\u200D\uFE0F]/g, '');

		const cleaned = preserveSpeechPunctuation
			? withoutEmoji
				.replace(/[^\p{L}\p{N}\s.,!?;:'"()\-]/gu, ' ')
				.replace(/\s+/g, ' ')
				.trim()
			: withoutEmoji
				.replace(/[\p{P}\p{S}]/gu, ' ')
				.replace(/\s+/g, ' ')
				.trim();

		if (!cleaned) return '';
		if (!preserveSpeechPunctuation) return cleaned;

		return /[.!?…]$/.test(cleaned) ? cleaned : `${cleaned}.`;
	};

	const detectReadAloudLanguage = (text: string): 'en-US' | 'es-ES' => {
		const lowered = text.toLowerCase();

		const spanishWordMatches = lowered.match(/\b(el|la|los|las|de|del|que|por|para|con|sin|una|uno|un|es|y|en|como|hola|gracias)\b/g) ?? [];
		const englishWordMatches = lowered.match(/\b(the|and|is|are|to|of|for|with|without|hello|thanks|please|you|your)\b/g) ?? [];

		const hasSpanishPunctuation = /[¿¡]/.test(text);
		const hasSpanishAccents = /[áéíóúñü]/i.test(text);

		if (hasSpanishPunctuation || hasSpanishAccents || spanishWordMatches.length > englishWordMatches.length) {
			return 'es-ES';
		}

		return 'en-US';
	};

	const toggleReadAloud = (text: string, messageKey: string) => {
		if (!canUseReadAloud || !text.trim() || !browser || !window.speechSynthesis || !window.SpeechSynthesisUtterance) {
			return;
		}

		if (speakingMessageKey === messageKey) {
			stopReadAloud();
			return;
		}

		const speechText = sanitizeTextForSpeech(text);
		if (!speechText) {
			return;
		}

		const readAloudLanguage = detectReadAloudLanguage(speechText);

		window.speechSynthesis.cancel();
		const utterance = new window.SpeechSynthesisUtterance(speechText);
		utterance.lang = readAloudLanguage;
		const preferredVoice = getPreferredReadAloudVoice(readAloudLanguage);
		if (preferredVoice) {
			utterance.voice = preferredVoice;
		}
		utterance.rate = 0.85;
		utterance.pitch = readAloudLanguage === 'en-US' ? 1.08 : 1;
		speakingMessageKey = messageKey;

		utterance.onend = () => {
			if (speakingMessageKey === messageKey) {
				speakingMessageKey = null;
			}
		};

		utterance.onerror = () => {
			if (speakingMessageKey === messageKey) {
				speakingMessageKey = null;
			}
		};

		window.speechSynthesis.speak(utterance);
	};
</script>

<div class={`chatbot-root ${className}`}>
	{#if minimized}
		{#if className.includes('design-notes-chatbot')}
			<div class="chatbot-speech-bubble">{$settingsStore?.language === 'es' ? '¿Necesitas ayuda? ¡Habla con SPOT Bot!' : 'Need help? Talk to SPOT Bot!'}</div>
		{/if}
		<button type="button" class="chatbot-launcher {className.includes('design-notes-chatbot') ? 'chatbot-launcher-pulse' : ''}" on:click={toggleMinimized} aria-label="Open chatbot">
			<div class="launcher-titlebar">
				<span>{title}</span>
			</div>
			<div class="launcher-body">
				<img src="/img/characters/spot-bot/spot-bot-icon.svg" alt="SPOT Bot" draggable="false" />
			</div>
		</button>
	{:else}
		<div class="chatbot-widget">
			<div class="chatbot-header">
				<span>{title}</span>
				<img src="/img/characters/spot-bot/spot-bot-icon.svg" alt="SPOT Bot" class="header-robot-icon" />
				<button type="button" class="minimize-btn" on:click={toggleMinimized} aria-label="Minimize chatbot" title="Minimize">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
			</div>

			<div class="chatbot-body">
				<div class="chatbot-messages">
					{#if messages.length === 0}
						<div class="empty-message">Ask a question to start.</div>
					{/if}

					{#each messages as message, index}
						<div class={`message-row ${message.sender}`}>
							<span class="message-text">{message.text}</span>
							{#if canUseReadAloud}
								<button
									type="button"
									class={`read-aloud-btn ${speakingMessageKey === `${message.sender}-${index}` ? 'speaking' : ''}`}
									on:click={() => toggleReadAloud(message.text, `${message.sender}-${index}`)}
									aria-label={speakingMessageKey === `${message.sender}-${index}` ? 'Stop reading message' : 'Read message aloud'}
									title={speakingMessageKey === `${message.sender}-${index}` ? 'Stop' : 'Read aloud'}>
									<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
										<path d="M3 10v4a1 1 0 0 0 1 1h3l5 4V5L7 9H4a1 1 0 0 0-1 1zm13.5 2a3.5 3.5 0 0 0-2-3.15v6.3a3.5 3.5 0 0 0 2-3.15zm-2-8.47v2.2a7 7 0 0 1 0 12.54v2.2a9 9 0 0 0 0-16.94z"/>
									</svg>
								</button>
							{/if}
						</div>
					{/each}

					{#if loading}
						<div class="message-row bot typing-indicator">
							<span></span><span></span><span></span>
						</div>
					{/if}
				</div>

				{#if errorMessage}
					<div class="error-message">{errorMessage}</div>
				{/if}

				<form
					class="chatbot-input"
					on:submit|preventDefault={() => {
						sendMessage();
					}}
				>
					<input
						type="text"
						placeholder="Ask chatbot..."
						bind:value={input}
						disabled={loading}
					/>
					{#if canUseSpeechToText}
						<button
							type="button"
							class={`voice-btn ${isRecording ? 'recording' : ''}`}
							on:click={toggleVoiceInput}
							disabled={loading}
							aria-label={isRecording ? 'Stop voice input' : 'Start voice input'}
							title={isRecording ? 'Stop voice input' : 'Start voice input'}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V20h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2.08A7 7 0 0 1 5 11a1 1 0 1 1 2 0 5 5 0 0 0 10 0z"/>
							</svg>
						</button>
					{/if}
					<button class="chatbot-send-btn" type="submit" disabled={loading || !input.trim()}>Send</button>
				</form>
			</div>
		</div>
	{/if}
</div>

<style>
	.chatbot-root {
		position: fixed;
		left: 2.2rem;
		bottom: 1.4rem;
		z-index: 9999;
	}

	.chatbot-root.design-notes-chatbot {
		left: 1rem;
		right: auto;
		bottom: 1rem;
	}

	.chatbot-speech-bubble {
		position: absolute;
		top: calc(50% + 1.5rem);
		left: 100%;
		transform: translateY(-50%);
		margin-left: 12px;
		background: #f4e8de;
		color: #a43316;
		font-size: 0.78rem;
		font-weight: bold;
		white-space: nowrap;
		padding: 6px 10px;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.25);
		pointer-events: none;
		z-index: 10000;
	}

	.chatbot-speech-bubble::after {
		content: '';
		position: absolute;
		top: 50%;
		right: 100%;
		transform: translateY(-50%);
		border: 6px solid transparent;
		border-right-color: #f4e8de;
	}

	@keyframes chatbot-pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(244, 232, 222, 0.9), 0 0 30px rgba(180, 68, 29, 0.4); }
		50% { box-shadow: 0 0 0 12px rgba(244, 232, 222, 0), 0 0 30px rgba(180, 68, 29, 0.4); }
	}

	.chatbot-launcher-pulse {
		animation: chatbot-pulse 1.6s ease-in-out infinite;
	}

	.chatbot-launcher {
		width: 136px;
		padding: 0;
		border: 0;
		border: 2px solid #b84922;
		border-radius: 10px;
		overflow: hidden;
		background: #ece9e6;
		box-shadow: 0 0 30px rgba(180, 68, 29, 0.4);
		cursor: pointer;
	}

	.launcher-titlebar {
		height: 22px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 0 0.7rem;
		background: #a43316;
		color: #f4e8de;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.launcher-body {
		height: 96px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f2efeb;
	}

	.launcher-body img {
		height: 90px;
		width: 90px;
		object-fit: contain;
		user-select: none;
		pointer-events: none;
	}

	.chatbot-widget {
		width: min(360px, 44vw);
		border: 2px solid #b84922;
		border-radius: 12px;
		overflow: hidden;
		background: #ece9e6;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.38);
	}

	.chatbot-header {
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		padding: 0 0.6rem;
		border: 0;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		background: #a43316;
		color: #f4e8de;
		border-bottom: 1px solid #c96b3f;
	}

	.header-robot-icon {
		height: 26px;
		width: auto;
		margin-left: 0.2rem;
		object-fit: contain;
		filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));
	}

	.minimize-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: auto;
		width: 24px;
		height: 24px;
		padding: 0;
		border: 1px solid rgba(244, 232, 222, 0.4);
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.1);
		color: #f4e8de;
		cursor: pointer;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.minimize-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(244, 232, 222, 0.6);
		transform: scale(1.05);
	}

	.minimize-btn:active {
		transform: scale(0.95);
	}

	.minimize-btn svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.chatbot-body {
		width: 100%;
		background: #ece9e6;
	}

	.chatbot-messages {
		height: 190px;
		overflow-y: auto;
		padding: 0.7rem;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.empty-message {
		font-size: 0.75rem;
		opacity: 0.78;
		color: #565c67;
	}

	.message-row {
		padding: 0.45rem 0.55rem;
		border-radius: 2px;
		font-size: 0.78rem;
		line-height: 1.2;
		border: 1px solid #ddd4cf;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.message-text {
		flex: 1;
		min-width: 0;
		word-break: break-word;
	}

	.read-aloud-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 0;
		border: 1px solid rgba(153, 122, 109, 0.45);
		border-radius: 2px;
		background: #f6f1ed;
		color: #8f4b2f;
		cursor: pointer;
		flex-shrink: 0;
	}

	.read-aloud-btn.speaking {
		background: #b2441d;
		border-color: #9f3a18;
		color: #f8efe9;
	}

	.read-aloud-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.message-row.user {
		align-self: flex-end;
		background: #e2e0df;
		color: #1a2333;
		border-left: 4px solid #8f9bab;
	}

	.message-row.bot {
		align-self: flex-start;
		background: #fbfaf9;
		color: #121a29;
		border-left: 4px solid #b84a22;
	}

	.typing-indicator {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 0.5rem 0.7rem;
		min-width: 44px;
	}

	.typing-indicator span {
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #b84a22;
		animation: bounce 1.2s infinite ease-in-out;
	}

	.typing-indicator span:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing-indicator span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes bounce {
		0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
		30% { transform: translateY(-5px); opacity: 1; }
	}

	.error-message {
		font-size: 0.72rem;
		padding: 0 0.6rem 0.4rem;
		color: #a23222;
	}

	.chatbot-input {
		display: flex;
		gap: 0.35rem;
		padding: 0.45rem;
		border-top: 1px solid #d8cbc4;
		background: #e9e5e3;
	}

	.chatbot-input input {
		flex: 1;
		min-width: 0;
		font-size: 0.76rem;
		padding: 0.35rem 0.45rem;
		border: 1px solid #cfc3bc;
		border-radius: 2px;
		background: #f8f7f6;
		color: #172033;
	}

	.chatbot-input input::placeholder {
		color: #b59d94;
	}

	.chatbot-input .voice-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		padding: 0;
		border: 1px solid #cfc3bc;
		border-radius: 2px;
		background: #f8f7f6;
		color: #8d3d22;
		cursor: pointer;
	}

	.chatbot-input .voice-btn.recording {
		border-color: #9f3a18;
		background: #b2441d;
		color: #f8efe9;
	}

	.chatbot-input .voice-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.chatbot-input .chatbot-send-btn {
		font-size: 0.74rem;
		padding: 0.35rem 0.55rem;
		border: 1px solid #9f3a18;
		border-radius: 2px;
		background: #b2441d;
		color: #f8efe9;
		cursor: pointer;
		white-space: nowrap;
	}

	.chatbot-input button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
