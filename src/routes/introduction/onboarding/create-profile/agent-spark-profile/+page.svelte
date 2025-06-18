<!--
 /src/routes/introduction/onboarding/create-profile/agent-spark-profile/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import ProfilesApp from '$lib/components/tablet/profiles/ProfilesApp.svelte';
</script>

<ProfilesApp handleClick={() => goto("/introduction/onboarding/create-profile?page=5")} />
