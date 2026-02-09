<script lang="ts">
	import { getContext } from 'svelte';
	import { getTranslation, type Language } from '$lib/utils/translations';
	import { languageStore } from '$lib/utils/stores/languageStore';

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

	// @ts-ignore
	const { close } = getContext('simple-modal');

	import Dropzone from 'svelte-file-dropzone';
	import Papa from 'papaparse';
	import { XlsxParser } from "xlsx-to-js";

	import type { Student } from '$lib/types/UserData';
	import { sessionTeacherID } from '$lib/utils/stores/store';
	import { get } from 'svelte/store';

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
			['first_name', 'last_name', 'age'],
			['John', 'Doe', 9],
			['Jane', 'Doe', 10]
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

	const parse = async () => {
		var file = files.accepted[0];

		// Use XlsxParser for XLSX files
		if (file.name.endsWith('.xlsx')) {
			let parser = new XlsxParser();
			let workbook = await parser.readFile(file, { dense: true, styles: false, drawings: false, skipHiddenRows: true });

			console.log('workbook: ', workbook);
			let data = workbook.workSheets[0].data.map((row) => {
				return {
					first_name: row[0].value,
					last_name: row[1].value,
					age: row[2].value
				};
			});

			console.log('data: ', data);

			data = data.filter((row) => row.first_name && row.last_name && row.age && !isNaN(row.age));
			data.forEach((student) => {
				studentsFromCSV.push({
					teacher_id: get(sessionTeacherID),
					first_name: student.first_name,
					last_name: student.last_name,
					age: student.age
				});
			});
			console.log('studentsFromCSV: ', studentsFromCSV);
			_onParse();
			return;
		}

		// Use PapaParse for CSV files
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
						teacher_id: get(sessionTeacherID),
						first_name: student.first_name,
						last_name: student.last_name,
						age: student.age
					});
				});

				console.log('student-from-csv: ', studentsFromCSV);
				_onParse();
			}
		});
	};
</script>

<p class="mb-8 text-lg font-bold">{getTranslation(currentLanguage, 'common.upload.uploadCsvXlsx')}</p>

<Dropzone on:drop={handleFilesSelect}>{getTranslation(currentLanguage, 'common.upload.dragFilesHere')}</Dropzone>

<div class="mt-8 flex flex-col space-y-5">
	{#if files.accepted.length > 0}
		<ol>
			{#each files.accepted as item}
				<li>{item.name}</li>
			{/each}
		</ol>
	{:else}
		<p>{getTranslation(currentLanguage, 'common.upload.noFilesUploaded')}</p>
	{/if}

	<button
		class={`btn ${files.accepted.length > 0 ? 'btn-primary' : 'btn-disabled'} `}
		on:click={handleUpload}>{getTranslation(currentLanguage, 'common.upload.upload')}</button>
	<button class={'btn btn-primary'} on:click={getSampleCSV}>{getTranslation(currentLanguage, 'common.upload.getSampleCsv')}</button>
</div>
