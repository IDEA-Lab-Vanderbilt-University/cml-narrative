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

    /**
    * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
    * @param event can be destructured to obtain which way the dialog in a script should progress
    */
    const handleDialogEvent = (event) => {
        // TODO: Implement handling of DialogEvent
    }

</script>

<Scene background="/img/backgrounds/captain_office.jpg"> 
    <div class="w-full" slot="dialog">
        <DialogBox speaker="Captain Storm" dialog="This is a test!!" avatar="/img/characters/captain-storm/storm_yeah.png" on:dialogEvent={handleDialogEvent}></DialogBox>
    </div>
    <div slot="content" class="w-full h-full">
        <div class=" h-full">hello</div>
    </div>
</Scene>