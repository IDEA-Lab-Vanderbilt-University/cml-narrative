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

  const dispatch = createEventDispatcher();
  let iframeEl: HTMLIFrameElement | null = null;
  let listener: (event: MessageEvent) => void;
  let iframeLoaded: boolean = false;
  let submitted: boolean = false;

  const src = `https://idea-lab-vanderbilt-university.github.io/prg-raise-playground/idea-lab/?student_id=${overrideStudentID ?? get(accessTokenStore)}&host=${overrideHost ?? (browser ? window.location.origin : '')}`;

  onMount(() => {
    listener = (event: MessageEvent) => {
      try {
        if (event?.data?.type === 'travelLogSubmitted') {
          dispatch('submitted', event.data);
        }
      } catch (e) {
        // ignore malformed messages
      }
    };

    window.addEventListener('message', listener);
  });

  onDestroy(() => {
    if (listener) window.removeEventListener('message', listener);
  });

  function sendMessage() {
    if (confirmBefore) {
      if (!confirm(confirmMessage)) return;
    }

    if (iframeEl?.contentWindow) {
        submitted = true;
      iframeEl.contentWindow.postMessage({
        type: 'submitTravelLog',
        data: {
          description,
          status
        }
      }, '*');
    }
  }
</script>

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

{#if !iframeLoaded}
  <h1 class="text-center mt-4 text-2xl text-white" id="loadingCodinator">
    Loading Codinator...
  </h1>
{/if}

{#if buttonLabel}
<button class="nicebtn" id={"codinatorSubmit"} on:click={sendMessage} disabled={!iframeLoaded || submitted}>{buttonLabel}</button>
{/if}

<style>
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
    
    .nicebtn:not(:disabled):hover {
		transform: scale(1.05);
	}

    .nicebtn:not(:disabled):active {
		transform: scale(0.95);
	}
	
    .nicebtn:disabled {
		filter: grayscale(1);
		cursor: not-allowed;
	}

	#codinatorIframe {
		width: 100%;
		height: 75vh;
		border: none;
	}

	#codinatorSubmit {
		position: absolute;
		bottom: 2vh;
		right: 2vh;
	}

    #loadingCodinator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

</style>
