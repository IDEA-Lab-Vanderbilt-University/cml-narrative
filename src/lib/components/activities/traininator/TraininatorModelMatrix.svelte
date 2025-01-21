<script lang="ts">
    export let classes: string[] = [];
    export let modelMatrix: string[][] = [];
    export let cellClasses: string[][] = [];
</script>

<table id="modelMatrix">
    <thead>
        <tr>
            <th></th>
            <th colspan={classes.length + 1}>Model Says...</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="modelMaxtrixPlaceholder"></td>
            <td class="modelMaxtrixPlaceholder"></td>
            {#each classes as className}
                <td class="modelMaxtrixLabel">{className}</td>
            {/each}
        </tr>
        <tr>
            <td rowspan={classes.length}  class="modelMaxtrixPlaceholder">You said...</td>
            <td class="modelMaxtrixLabel">{classes[0]}</td>
            {#each modelMatrix[0] as cell, j}
                {#if cellClasses.length > 0}
                    <td class={cellClasses[0][j]}><span>{cell}</span></td>
                {:else}
                    <td><span>{cell}</span></td>
                {/if}
            {/each}
        </tr>
        {#each modelMatrix as row, i}
            {#if i > 0}
                <tr>
                    <td class="modelMaxtrixLabel">{classes[i]}</td>
                    {#each row as cell, j}
                        {#if cellClasses.length > 0}
                            <td class={cellClasses[i][j]}><span>{cell}</span></td>
                        {:else}
                            <td><span>{cell}</span></td>
                        {/if}
                    {/each}
                </tr>
            {/if}
        {/each}
    </tbody>
</table>
{#if modelMatrix[0][0] == '-'}
    <div id="modelMatrixOverlay">
        Test model to see results!
    </div>
{/if}

<style>
    #modelMatrix {
        width: 100%;
        margin: 1vh auto;
        border-collapse: collapse;
        color: #eee;
        text-align: center;
        font-size: 2.2vh
    }

    #modelMatrix tbody tr td {
        border: 1px solid #eee;
        padding: 0.75vh 0.75vw;
    }

    #modelMatrix tbody tr td.modelMaxtrixLabel {
        border: 1px solid #eee;
    }

    #modelMatrix tbody tr td.modelMaxtrixPlaceholder {
        border: none;
    }

    #modelMatrixOverlay {
        background-color: #99bacfcc;
        color: #eee;
        font-size: 2.5vh;
        width: 75%;
        margin: 1vh auto;
        text-align: center;
        border-radius: 10px;
        padding: 3vh 2vh;
        position: relative;
        z-index: 1;
        margin-top: -15vh;
    }

    .correct {
        background-color: #00ff009a;
    }

    .incorrect {
        background-color: #ff00009a;
    }

</style>