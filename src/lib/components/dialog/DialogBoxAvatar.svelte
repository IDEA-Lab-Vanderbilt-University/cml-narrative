<script lang="ts">
    export let avatar: string;
    export let speaker: string;
    export let avatarClass: string = 'mr-14 self-end';
    export let size: string | null = null;
    export let mirror: boolean = false;

    export let extraStyle = '';

    $:{
        if (speaker == 'Bot Buddy') {
            // TODO: Use Bot Buddy's color from user account
            extraStyle += 'filter: hue-rotate(0deg);';            
        } else {
            extraStyle += 'filter: hue-rotate(0deg);';
        }
    };
</script>

<div class="davatar {avatarClass} {size} {mirror? 'mirrored': ''} ">
    <img src={avatar} alt={avatar != '' ? speaker: ''} style={extraStyle} />
</div>

<style>
    .davatar img {
        max-height: 35vh;
    }

    .full img {
        height: 60vh;
        max-height: none;
    }

    .mirrored img {
        transform: scaleX(-1);
    }
</style>