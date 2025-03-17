<script lang="ts">
	import { onMount } from "svelte";


	import Tablet from "../tablet/Tablet.svelte";
	import DataService from "$lib/utils/DataService";
	import { studentDataStore } from "$lib/utils/stores/store";
	import { get } from "svelte/store";

	let teacherAgent = '';

    export let description: string;

    // If teacher approves
    export let onSuccess: () => void;

    // If teacher rejects, this function will be called with the rejection comment
    export let onRejected: (reason: string) => void;

    let checkInterval: NodeJS.Timeout;
    export let task: string;
    export let sponge: string;

	onMount(async () => {
		const student = get(studentDataStore);
		if(student && student.teacher_id) {
			const teacher = await DataService.Teacher.getTeacher(student.teacher_id);

			if(teacher && teacher.agent_name) {
				teacherAgent = teacher.agent_name;
			}
		}

        checkInterval = setInterval(async () => {
            const student_id = get(studentDataStore).id;

            if (!student_id) {
                console.error("Student ID is not available.");
                return;
            }

            // Check if the travel log has been approved or rejected 
            await DataService.TravelLog.getTravelLogs(description, student_id).then((travelLogs) => {
                if (travelLogs.length > 0) {
                    const travelLog = travelLogs[travelLogs.length - 1]; // Get the latest travel log
                    console.log("Travel log status: ", travelLog.status);
                    if (travelLog.status === "approved") {
                        clearInterval(checkInterval);
                        onSuccess();
                    } else if (travelLog.status === "rejected") {
                        clearInterval(checkInterval);

                        let rejectionComment = '';
                        try {
                            const dataObj = JSON.parse(travelLog.data);
                            rejectionComment = dataObj.rejectionComment || '';
                        } catch (error) {
                            console.error("Error parsing rejection comment: ", error);
                        }

                        onRejected(rejectionComment);
                    }
                }
            }).catch((error) => {
                console.error("Error checking for travel logs: ", error);
            });
        }, 2000); // Check every 2 seconds
	});

</script>
<Tablet showMeter={false} showBottomButtons={false}>
    <div class="robostependsummary centervert">
        <p>
            Great job! Agent {teacherAgent} is reviewing your {task}...
        </p>
        <p>
            {sponge}
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