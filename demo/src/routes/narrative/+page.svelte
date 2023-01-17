<!--
 /src/routes/narrative/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on October 18th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->



<script>
	 /** @type {import('./$types').PageData} */
	export let data;

	import DialogBox from '$lib/components/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';

    import script from '$lib/scripts/intro/script1';

	/** Current index of the script */
	var scriptState = 0;

	/** What is being shown on the screen */
	var currentLine = script[0];

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = (event) => {
		var state = event.detail.state;

		if (state == 'forward' && scriptState < script.length - 1) {
			scriptState = scriptState + 1;
			currentLine = script[scriptState];
		} else if (state == 'back' && scriptState > 0) {
			scriptState = scriptState - 1;

			currentLine = script[scriptState];
		}

	};
</script>

<Scene background={currentLine.background}>
	<DialogBox
		on:dialogEvent={handleDialogEvent}
		speaker={currentLine.speaker}
		dialog={currentLine.dialog}
		avatar={currentLine.avatar}
	/>
</Scene>
