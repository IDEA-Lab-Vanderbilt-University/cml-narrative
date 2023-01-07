<!--
 /src/routes/introduction/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import DialogBox from "$lib/components/dialog/DialogBox.svelte";
import Scene from "$lib/components/scene/Scene.svelte";


</script>

<Scene background="/img/backgrounds/captain_office.jpg"> 
    <DialogBox speaker="Captain Storm" dialog="This is a test!!" avatar="/img/characters/captain-storm/storm_yeah.png"></DialogBox>
</Scene>