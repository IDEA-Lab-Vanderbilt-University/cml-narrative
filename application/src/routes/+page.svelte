<script>
	import DialogBox from '../components/DialogBox.svelte';

	const script = [
		{
			speaker: 'Captain Storm',
			dialog: 'Welcome to the Solving Problems of Tomorrow Agency, my name is Captain Storm. '
		},
		{
			speaker: 'Captain Storm',
			dialog: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
		},
		{
			speaker: 'Captain Apple',
			dialog:
				'Facilis harum soluta maiores possimus recusandae placeat animi ratione pariatur eos qui non quam commodi, quasi sed eaque accusamus hic facere earum minima natus laborum molestiae ut itaque!'
		},
		{
			speaker: 'Captain Storm',
			dialog: 'Incidunt voluptatum quod veniam.'
		}
	];

	var scriptState = 0;

	var currentLine = script[0];

	const handleDialogEvent = (event) => {
		var state = event.detail.state;

		console.log(state);

		if (state == 'forward' && scriptState < script.length - 1) {
			scriptState = scriptState + 1;
			currentLine = script[scriptState];
		} else if (state == 'back' && scriptState > 0) {
			scriptState = scriptState - 1;

			currentLine = script[scriptState];
		}
	};
</script>

<div class="w-screen h-screen">
	<div class="bg-gray-400 w-full h-full relative z-0">
		<div
			class="bg-center bg-cover z-0 w-full h-full"
			style="background-image: url('img/principals-office-with-desk.jpg');"
		/>
		<div class="absolute inset-x-0 bottom-0 mb-16 flex justify-center items-center z-10">
			<DialogBox
				on:dialogEvent={handleDialogEvent}
				speaker={currentLine.speaker}
				dialog={currentLine.dialog}
			/>
		</div>
	</div>
</div>
