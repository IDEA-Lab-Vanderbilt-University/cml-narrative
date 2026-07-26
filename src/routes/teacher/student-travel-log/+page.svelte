<script lang="ts">
	import { goto } from '$app/navigation';
	import TravelLogsApp from '$lib/components/tablet/travel-logs/TravelLogsApp.svelte';

	export let data: { studentId: string };
</script>

<TravelLogsApp
	studentId={data.studentId}
	handleClick={() => goto('/teacher/class-creation')} />