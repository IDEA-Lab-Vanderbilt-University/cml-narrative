<svelte:options accessors />

<script lang="ts">
    export let date: Date = new Date();
</script>

<div>
    <div class="h-full w-full flex justify-center items-center bg-gray-800">
        <div class="col">
            <div class="colhead">
                MONTH
            </div>
            <div class="colval">
                {(date.getMonth() + 1).toString().padStart(2, '0')}
            </div>
        </div>
        <div class="col">
            <div class="colhead">
                DAY
            </div>
            <div class="colval">
                {date.getDate().toString().padStart(2, '0')}
            </div>
        </div>
        <div class="col">
            <div class="colhead">
                YEAR
            </div>
            <div class="colval">
                {date.getFullYear()}
            </div>
        </div>
        <div class="col">
            <div class="colhead">
                TIME
            </div>
            <div class="colval">
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
        margin: 1rem;
    }

    .colhead {
        font-size: 1.5rem;
        color: white;
        background-color: darkred;
        padding: 0.5rem;
    }

    .colval {
        font-size: 3rem;
        color: white;
        font-family: monospace;
    }

</style>