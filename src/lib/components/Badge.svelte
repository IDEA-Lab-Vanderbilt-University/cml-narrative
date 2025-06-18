<script lang="ts">

export let name: string = 'Badge';
export let image: string = 'img/misc/badge1.png';

export let onClick: () => void = () => {};
</script>

<div id="badgebg" style="background-image: url({image})" class="flex items-center justify-center" on:mousedown={onClick}>
    <div id="badgename" class="text-white font-mokoto">
        {name}
    </div>
</div>

<style>
    #badgebg {
        background-size: 100% auto;
        height: 26vh;
        width: 64vh;
        background-repeat: no-repeat;
        background-position: center;
    }

    #badgename {
        font-size: 2vh;
        padding: 1vh;
        position: relative;
        left: 8vh;
        width: 35vh;
        text-align: center;
        user-select: none;
    }
</style>