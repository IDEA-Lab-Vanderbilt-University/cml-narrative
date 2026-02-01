<script>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { accessTokenStore } from "$lib/utils/stores/store";
	import { onMount } from "svelte";
	import { get } from "svelte/store";

    onMount(() => {
        if(!get(accessTokenStore)) {
            // Redirect to login if not logged in
            window.location.href = '/inators';
        }
    });

</script>

<iframe src="https://idea-lab-vanderbilt-university.github.io/prg-raise-playground/idea-lab/?student_id={get(accessTokenStore)}&host={browser? window.location.origin : ''}"
    id="codinatorIframe" frameborder="0" title="The Codinator"  allow="camera; microphone; bluetooth" ></iframe>
    <div class="flex absolute bottom-0 right-4 z-50 flex-col items-end space-y-2">
        <button class="rounded-full bg-green-500 px-4 py-2 text-white shadow-lg"
            on:click={() => {
            // Submit the robot code by passing a postMessage to the iframe
            const codinatorIframe = document.getElementById('codinatorIframe');
            if (codinatorIframe && codinatorIframe instanceof HTMLIFrameElement) {
                // Send a submitTravelLog message to the iframe to submit the code (data is description, status)
                codinatorIframe.contentWindow?.postMessage({
                    type: 'submitTravelLog',
                    data: {
                        description: 'robotcode',
                        status: 'completed'
                    }
                }, '*');
            }
        }}>
            Save
        </button>
        <button
            class="z-50 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg"
            on:click={() => (goto('/inators/menu'))}
        >
            Go to Menu
        </button>
    </div>
<style>


	#codinatorIframe {
		width: 100%;
		height: 75vh;
		border: none;
	}
</style>