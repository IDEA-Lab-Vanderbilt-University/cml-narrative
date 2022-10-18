<!--
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on October 18th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script>
	import DialogBox from '$lib/components/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';

    import script from '$lib/scripts/intro/script1';

	/** A script for a given scene */
	// const script = [
	// 	{
	// 		speaker: 'Captain Storm',
	// 		dialog: 'Welcome to the Solving Problems of Tomorrow Agency, my name is Captain Storm. ',
	// 		avatar: '/img/characters/captain-storm/storm_yeah.png'
	// 	},
	// 	{
	// 		speaker: 'Captain Storm',
	// 		dialog: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
	// 		avatar: '/img/characters/captain-storm/gesture_2_storm.png',
            
	// 	},
	// 	{
	// 		speaker: 'Captain Apple',
	// 		dialog:
	// 			'Facilis harum soluta maiores possimus recusandae placeat animi ratione pariatur eos qui non quam commodi, quasi sed eaque accusamus hic facere earum minima natus laborum molestiae ut itaque!',
    //         avatar: '/img/characters/captain-storm/storm_yeah.png'
	// 	},
	// 	{
	// 		speaker: 'Captain Storm',
	// 		dialog: 'Incidunt voluptatum quod veniam.',
	// 		avatar: '/img/characters/captain-storm/storm_yeah.png'
	// 	}
	// ];

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

<Scene background="/img/backgrounds/captain_office.jpg">
	<DialogBox
		on:dialogEvent={handleDialogEvent}
		speaker={currentLine.speaker}
		dialog={currentLine.dialog}
		avatar={currentLine.avatar}
	/>
</Scene>
