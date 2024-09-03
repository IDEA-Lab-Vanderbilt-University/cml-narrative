<svelte:options accessors />

<script lang="ts">
    export let date: Date = new Date();
    
    let active = false;

    $: {
        if(date.getTime() != Date.now()) {
            active = true;
            setTimeout(() => {
                active = false;
            }, 1000);
        }
    }
</script>

<div id="timerow">
    <div class="flex justify-center items-center bg-gray-800">
        <div class="col">
            <div class="colhead">
                MONTH
            </div>
            <div class="colval {active? 'active' : ''}">
                {(date.getMonth() + 1).toString().padStart(2, '0')}
            </div>
        </div>
        <div class="col">
            <div class="colhead">
                DAY
            </div>
            <div class="colval {active? 'active' : ''}">
                {date.getDate().toString().padStart(2, '0')}
            </div>
        </div>
        <div class="col">
            <div class="colhead">
                YEAR
            </div>
            <div class="colval {active? 'active' : ''}">
                {date.getFullYear()}
            </div>
        </div>
        <div class="col">
            <div class="colhead">
                TIME
            </div>
            <div class="colval {active? 'active' : ''}">
                {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}
            </div>
        </div>
    </div>
</div>

<style>
    .col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0.1vh 1vh;
        padding: 0.125vh 0;
    }

    .colhead {
        font-size: 2.5vh;
        color: white;
        background-color: darkred;
        padding: 0.125vh 0.5vh;
    }

    .colval {
        font-size: 3.75vh;
        color: white;
        font-family: monospace;
        transition: text-shadow 1s;
    }

    .colval.active {
        text-shadow: 0 0 5px white;
    }
</style>