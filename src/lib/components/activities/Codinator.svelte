<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { accessTokenStore } from '$lib/utils/stores/store.js';
  import { browser } from '$app/environment';

  export let description: string = 'robotcode';
  export let status: string = 'pending';
  export let buttonLabel: string = 'Submit';
  export let iframeStyle: string = 'height: 70vh;';
  export let confirmBefore: boolean = false;
  export let confirmMessage: string = "Are you sure?";
  export let overrideStudentID: string | null = null;
  export let overrideHost: string | null = null;
  export let allowFinishWithoutSubmission: boolean = false;
  export let requireSuccessfulBuild: boolean = false;
  export let unlockAfterMs: number = 0;
  export let showRobotConnectHint: boolean = false;
  export let robotConnectHintText: string = 'Click here to connect';
  export let glowConnectButton: boolean = false;
  export let showFlagHint: boolean = false;

  const dispatch = createEventDispatcher();
  let iframeEl: HTMLIFrameElement | null = null;
  let listener: (event: MessageEvent) => void;
  let iframeLoaded: boolean = false;
  let submitted: boolean = false;
  let modelBuiltSuccessfully: boolean = false;
  let timedUnlockReached: boolean = false;
  let unlockTimer: ReturnType<typeof setTimeout> | null = null;

  const src = `https://idea-lab-vanderbilt-university.github.io/prg-raise-playground/idea-lab/?student_id=${overrideStudentID ?? get(accessTokenStore)}&host=${overrideHost ?? (browser ? window.location.origin : '')}`;


  onMount(() => {
    if (unlockAfterMs > 0) {
      unlockTimer = setTimeout(() => {
        timedUnlockReached = true;
      }, unlockAfterMs);
    }

    listener = (event: MessageEvent) => {
      try {
        const rawData = event?.data;
        const messageType = String(rawData?.type ?? rawData?.event ?? rawData?.message?.type ?? '').toLowerCase();
        const payloadText = (() => {
          if (typeof rawData === 'string') {
            return rawData.toLowerCase();
          }

          try {
            return JSON.stringify(rawData ?? {}).toLowerCase();
          } catch {
            return '';
          }
        })();

        const isModelSuccessMessage =
          Boolean(rawData?.success) ||
          Boolean(rawData?.isSuccess) ||
          messageType.includes('travellogsubmitted') ||
          messageType.includes('robotconnected') ||
          messageType.includes('modelbuilt') ||
          messageType.includes('modeltested') ||
          messageType.includes('testsuccessful') ||
          messageType.includes('buildsuccessful') ||
          messageType.includes('prediction') ||
          messageType.includes('classif') ||
          messageType.includes('modelselected') ||
          payloadText.includes('robotconnected') ||
          payloadText.includes('modelselected') ||
          payloadText.includes('model selected') ||
          payloadText.includes('prediction') ||
          payloadText.includes('classified') ||
          (payloadText.includes('result') && payloadText.includes('confidence'));

        if (isModelSuccessMessage && requireSuccessfulBuild) {
          modelBuiltSuccessfully = true;
        }

        if (event?.data?.type === 'travelLogSubmitted') {
          modelBuiltSuccessfully = true;
          dispatch('submitted', event.data);
        }
        // Listen for robot connection event from iframe
        if (event?.data?.type === 'robotConnected') {
          modelBuiltSuccessfully = true;
          dispatch('robotconnected');
        }
      } catch (e) {
        // ignore malformed messages
      }
    };
    window.addEventListener('message', listener);
  });

  onDestroy(() => {
    if (listener) window.removeEventListener('message', listener);
    if (unlockTimer) {
      clearTimeout(unlockTimer);
      unlockTimer = null;
    }
  });

  function sendMessage() {
    if (confirmBefore) {
      if (!confirm(confirmMessage)) return;
    }

    if (iframeEl?.contentWindow) {
      submitted = true;

      if (allowFinishWithoutSubmission) {
        dispatch('submitted', { localBypass: true });
      }

      iframeEl.contentWindow.postMessage({
        type: 'submitTravelLog',
        data: {
          description,
          status
        }
      }, '*');
    }
  }

  $: isButtonDisabled = !iframeLoaded || submitted || (requireSuccessfulBuild && !modelBuiltSuccessfully && !timedUnlockReached);
</script>

<div id="codinatorContainer">
  <iframe
    bind:this={iframeEl}
    src={src}
    id={"codinatorIframe"}
    frameborder="0"
    title="The Codinator"
    allow="camera; microphone; bluetooth"
    style={iframeStyle}
    on:load={() => {
      iframeLoaded = true;
    }}
  ></iframe>

  {#if showRobotConnectHint}
    <div class="robot-connect-overlay" aria-hidden="true">
      <div class="robot-connect-pulse"></div>
      <div class="robot-connect-label">{robotConnectHintText}</div>
    </div>
  {/if}

  {#if showFlagHint}
    <div class="flag-highlight-overlay" aria-hidden="true">
      <div class="flag-highlight-ring"></div>
    </div>
  {/if}

  {#if !iframeLoaded}
    <h1 class="text-center mt-4 text-2xl text-white" id="loadingCodinator">
      Loading Codinator...
    </h1>
  {/if}

  {#if buttonLabel}
  <button 
    class="nicebtn {glowConnectButton ? 'glow-connect-btn' : ''}" 
    id={"codinatorSubmit"} 
    on:click={sendMessage} 
    disabled={isButtonDisabled}
    title={requireSuccessfulBuild && !modelBuiltSuccessfully && !timedUnlockReached ? 'Test your model first or wait for timer' : ''}
  >
    {buttonLabel}
  </button>
  {/if}
</div>

<style>
  #codinatorContainer {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  iframe { width: 100%; border: none; }


  .nicebtn {
    background: radial-gradient(farthest-corner at bottom right, #49c5ff 75%, #fff 100%);
    background-color: #49c5ff;
    color: #111;
    border: none;
    border: 2px solid #289dd3;
    height: 7vh;
    border-radius: 3.5vh;
    padding: 1vh 2vw;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.3s;
    display: block;
  }

  .glow-connect-btn {
    box-shadow: 0 0 0 4px #49c5ff88, 0 0 16px 8px #49c5ff55;
    animation: glow-connect-pulse 1.2s infinite alternate;
    border-color: #49c5ff;
  }

  @keyframes glow-connect-pulse {
    0% {
      box-shadow: 0 0 0 4px #49c5ff88, 0 0 16px 8px #49c5ff55;
    }
    100% {
      box-shadow: 0 0 0 8px #49c5ff44, 0 0 32px 16px #49c5ff33;
    }
  }
    
    .nicebtn:not(:disabled):hover {
		transform: scale(1.05);
	}

    .nicebtn:not(:disabled):active {
		transform: scale(0.95);
	}
	
    .nicebtn:disabled {
		filter: grayscale(1) brightness(0.7);
		cursor: not-allowed;
		opacity: 0.6;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  }

	#codinatorIframe {
		width: 100%;
		height: 75vh;
		border: none;
	}

	#codinatorSubmit {
		position: absolute;
		bottom: 2.4vh;
		right: 3.2vw;
		z-index: 30;
	}

  .robot-connect-overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    pointer-events: none;
  }

  .flag-highlight-overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    pointer-events: none;
  }

  .flag-highlight-ring {
    position: absolute;
    top: -0.6%;
    left: 66.9%;
    width: 3.45rem;
    height: 3.45rem;
    border: 4px solid #3bbf4a;
    border-radius: 1.35rem;
    box-shadow: 0 0 0 0 rgba(59, 191, 74, 0.7), 0 0 24px 8px rgba(59, 191, 74, 0.5);
    animation: flag-highlight-pulse 1.1s ease-in-out infinite;
  }

  .robot-connect-pulse {
    position: absolute;
    top: 8.9%;
    left: 0.26rem;
    width: 3.55rem;
    height: 3.55rem;
    border: 4px solid #b84922;
    border-radius: 9999px;
    box-shadow: 0 0 0 0 rgba(244, 232, 222, 1), 0 0 54px rgba(180, 68, 29, 0.82);
    animation: robot-connect-pulse 1.1s ease-in-out infinite;
    background: rgba(244, 232, 222, 0.34);
  }

  .robot-connect-label {
    position: absolute;
    right: 100%;
    top: 12.5%;
    transform: translateY(-50%);
    font-family: 'Gemunu Libre';
    font-size: 0.92rem;
    font-weight: 700;
    color: #a43316;
    background: #f4e8de;
    border-radius: 14px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
    padding: 9px 13px;
    white-space: nowrap;
    margin-right: 14px;
    display: flex;
    align-items: center;
  }

  .robot-connect-label::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 8px solid transparent;
    border-left-color: #f4e8de;
  }

  @keyframes robot-connect-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(244, 232, 222, 1), 0 0 54px rgba(180, 68, 29, 0.82);
      transform: scale(0.9);
    }
    70% {
      box-shadow: 0 0 0 24px rgba(244, 232, 222, 0), 0 0 62px rgba(180, 68, 29, 0.82);
      transform: scale(1.12);
    }
  }

  @keyframes flag-highlight-pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(59, 191, 74, 0.7), 0 0 24px 8px rgba(59, 191, 74, 0.5);
      transform: scale(0.93);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(59, 191, 74, 0), 0 0 34px 11px rgba(59, 191, 74, 0.46);
      transform: scale(1.1);
    }
  }

    #loadingCodinator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

</style>
