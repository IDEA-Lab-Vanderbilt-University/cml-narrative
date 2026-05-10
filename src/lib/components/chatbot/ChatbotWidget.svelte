<script lang="ts">
	import DataService from '$lib/utils/DataService';

	export let assistantId = '';
	export let title = 'SPOT BOT';
	export let className = '';

	type Message = {
		sender: 'user' | 'bot';
		text: string;
	};

	let minimized = true;
	let loading = false;
	let errorMessage = '';
	let input = '';
	let messages: Message[] = [];

	const toggleMinimized = () => {
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
</script>

<div class={`chatbot-root ${className}`}>
	{#if minimized}
		<button type="button" class="chatbot-launcher" on:click={toggleMinimized} aria-label="Open chatbot">
			<div class="launcher-titlebar">
				<span>{title}</span>
			</div>
			<div class="launcher-body">
				<img src="/img/characters/bot-buddy/bot-buddy-base.png" alt="Chatbot" draggable="false" />
			</div>
		</button>
	{:else}
		<div class="chatbot-widget">
			<div class="chatbot-header">
				<span>{title}</span>
				<img src="/img/characters/bot-buddy/bot-buddy-base.png" alt="robot" class="header-robot-icon" />
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

					{#each messages as message}
						<div class={`message-row ${message.sender}`}>
							{message.text}
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
					<button type="submit" disabled={loading || !input.trim()}>Send</button>
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
		height: 64px;
		width: auto;
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
		justify-content: space-between;
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
		margin-left: 0.5rem;
		object-fit: contain;
		filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));
	}

	.minimize-btn {
		display: flex;
		align-items: center;
		justify-content: center;
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

	.chatbot-input button {
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
