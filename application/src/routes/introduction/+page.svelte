<!--
 /src/routes/introduction/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import { goto } from "$app/navigation";
	import DialogBox from "$lib/components/dialog/DialogBox.svelte";
    import Scene from "$lib/components/scene/Scene.svelte";
	import type { Line } from "$lib/types/Script";

    /** @type {import('./$types').PageData} */
    export let data;

    let line: Line

    /**
     * We declared the line variable above. This varible is "reactive" and will change on
     * each goto() call (implemented in handleDialogEvent()) as script data is returned 
     * from the "server".
     * 
     * Because the page doesn't "reload" like normal, (due to the way SvelteKit handles 
     * navigation and hydrates data on the page), when line data is changed, Svelte doesn't
     * know the data has changed to update the DOM. We tell Svelte using the $: syntax that
     * line is a reactive element and will change in the future. 
     * 
     * This solution was inspired by the following thread on StackOverflow:
     * https://stackoverflow.com/questions/74221733/sveltekit-call-load-function-in-page-server-when-params-change
    */
    $: (
        line = data.line
    )
    
console.log("DATA: ", data);

    /**
    * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
    * @param event can be destructured to obtain which way the dialog in a script should progress
    */
    const handleDialogEvent = async (event) => {
        var state = event.detail.state

        /**
         * Determine the state of the DialogEvent that was emitted. Then, we will navigate
         * the user to the appropriate url with appropriate querystring which represents
         * which line in the script should be returned to the user.
        */
        if (state == "forward") {
            console.log(line.id);
            
            if (line.id == 18){
                goto("/introduction/onboarding")
            } else {
                goto(`/introduction?page=${line.id + 1}`)

            }
        } else if (state == "back") {
            goto(`/introduction?page=${line.id - 1}`)
        }
    }

</script>

<Scene background={line.background}> 
    <div class="w-full" slot="dialog">
        <DialogBox speaker={line.speaker} dialog={line.dialog} avatar={line.avatar} on:dialogEvent={handleDialogEvent}></DialogBox>
    </div>
    <div slot="content" class="w-full h-full">
        <div class=" h-full">hello</div>
    </div>
</Scene>