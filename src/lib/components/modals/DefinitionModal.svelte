<script lang="ts">
	import DefinitionView from "../tablet/DefinitionView.svelte";
	import Tablet from "../tablet/Tablet.svelte";

    export let title: string;
    export let definition: string;
</script>

<Tablet>
    <DefinitionView title={title} definition={definition} />

    <div class="button-container">
        <button class="button" on:click>Next</button>
    </div>
</Tablet>

<style>
.button-container {
    display: flex;
    justify-content: center;
}

.button {
    background-color: #4adde2;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.5rem;
    padding: 10px 24px;
    cursor: pointer;
    border-radius: 30px;
}

</style>