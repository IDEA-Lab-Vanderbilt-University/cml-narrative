<!--
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on October 25th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script>
	import { goto } from '$app/navigation';

    // console.log("Data: ", data);

   import DialogBox from '$lib/components/DialogBox.svelte';
   import Scene from '$lib/components/scene/Scene.svelte';

   import script from '$lib/scripts/welcome/index';

   /** Current index of the script */
   var scriptState = 0;

//    /** What is being shown on the screen */
//    var currentLine = script[0];

   /**
    * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
    * @param event can be destructured to obtain which way the dialog in a script should progress
    */
   const handleDialogEvent = (event) => {
       var state = event.detail.state;

       if (state == 'forward') {
            // if (data.script.id == 18) {
            //     goto('/tablet/agent-onboarding/welcome')
            // } else {
            //     goto(`/narrative/intro/${data.script.id + 1}`)
            // }
       } else if (state == 'back') {
            // goto(`/narrative/intro/${data.script.id - 1}`)
       }

   };
</script>

<Scene background={script[scriptState].background}>
   <DialogBox
       on:dialogEvent={handleDialogEvent}
       speaker={script[scriptState].speaker}
       dialog={script[scriptState].dialog}
       avatar={script[scriptState].avatar}
   />
</Scene>
