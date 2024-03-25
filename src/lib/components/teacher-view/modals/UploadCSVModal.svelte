<script lang="ts">
	import { getContext } from 'svelte';

	// @ts-ignore
	const { close } = getContext('simple-modal');

	import Dropzone from 'svelte-file-dropzone';
	import Papa from 'papaparse';
	import type { Student } from '$lib/types/teacher-view/Student';

	let studentsFromCSV: Student[] = [];
	let files = {
		accepted: [],
		rejected: []
	};

	export let onParse = () => {};

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	const getSampleCSV = () => {
		// Define data
		const data = [
			['id', 'firstName', 'lastName', 'email'],
			[1, 'John', 'Doe', 'johndoe@gmail.com'],
			[2, 'Jane', 'Doe', 'janedoe@gmail.com']
		];

		// Convert Array to CSV Data
		const csvData = data.map((row) => row.join(',')).join('\n');

		// Create a Blob with the CSV data
		const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

		// Create a link element
		const link = document.createElement('a');

		// Set the URL and download attributes for the link
		link.href = URL.createObjectURL(blob);
		link.download = 'sample.csv';

		// Append the link to the body
		document.body.appendChild(link);

		// Simulate a click on the link
		link.click();

		// Remove the link from the body
		document.body.removeChild(link);
	};

	const handleUpload = () => {
		console.log('files-accepted: ', files.accepted);
		parse();
	};

	const _onParse = () => {
		// @ts-ignore
		onParse(studentsFromCSV);
		close();
	};

	const parse = () => {
		var file = files.accepted[0];

		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			error: (error) => {
				console.log(error);
			},
			complete: (result) => {
				console.log('result-data: ', result.data);

				result.data.forEach((student) => {
					studentsFromCSV.push({
						id: student.id,
						firstName: student.firstName,
						lastName: student.lastName,
						email: student.email
					});
				});

				console.log('student-from-csv: ', studentsFromCSV);
				_onParse();
			}
		});
	};
</script>

<p class="mb-8 text-lg font-bold">Upload CSV/XLSX of student data following the proper schema.</p>

<Dropzone on:drop={handleFilesSelect}>Drag CSV/XLSX here or click to find document</Dropzone>

<div class="mt-8 flex flex-col space-y-5">
	{#if files.accepted.length > 0}
		<ol>
			{#each files.accepted as item}
				<li>{item.name}</li>
			{/each}
		</ol>
	{:else}
		<p>No Files Uploaded!</p>
	{/if}

	<button
		class={`btn ${files.accepted.length > 0 ? 'btn-primary' : 'btn-disabled'} `}
		on:click={handleUpload}>Upload</button>
	<button class={'btn btn-primary'} on:click={getSampleCSV}>Get Sample CSV</button>
</div>
