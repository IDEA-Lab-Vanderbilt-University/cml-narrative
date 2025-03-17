<script lang="ts">
	import { onMount } from "svelte";


	import Tablet from "../tablet/Tablet.svelte";
	import DataService from "$lib/utils/DataService";
	import { studentDataStore } from "$lib/utils/stores/store";
	import { get } from "svelte/store";

	let teacherAgent = '';

    // If teacher approves
    export let onSuccess: () => void;

    // If teacher rejects
    export let onRejected: () => void;


	onMount(async () => {
		const student = get(studentDataStore);
		if(student && student.teacher_id) {
			const teacher = await DataService.Teacher.getTeacher(student.teacher_id);

			if(teacher && teacher.agent_name) {
				teacherAgent = teacher.agent_name;
			}
		}		
	});

</script>
<Tablet showMeter={false} showBottomButtons={false}>
    <div class="robostependsummary centervert">
        <p>
            Great job! Agent {teacherAgent} is reviewing your robot design...
        </p>
        <p>
            Meanwhile, start drawing a design for your robot!
        </p>
    </div>
</Tablet>

<style>
    .robostependsummary {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 1vh;
    }
    .robostependsummary p {
        font-size: 3vh;
        color: white;
        text-align: center;
    }
    
	.centervert {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>