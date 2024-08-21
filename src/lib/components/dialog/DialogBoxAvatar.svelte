<script lang="ts">
	import { onMount } from "svelte";

    export let avatar: string;
    export let speaker: string;
    export let avatarClass: string = '';

    let extraStyle = '';
    $:{
        if (speaker == 'Bot Buddy') {
            // TODO: Use Bot Buddy's color from user account
            extraStyle = 'filter: hue-rotate(0deg);';            
        } else {
            extraStyle = 'filter: hue-rotate(0deg);';
        }
    };
</script>

<div class="mr-14 self-end avatar {avatarClass}">
    <img src={avatar} alt={speaker} style={extraStyle} />
</div>