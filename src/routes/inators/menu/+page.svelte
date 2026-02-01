<script>
	import { goto } from "$app/navigation";

</script>

<div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-72 py-32 align-middle">
    <h2 class="text-white text-3xl">Inators Menu</h2>
    <div class="mt-10 space-x-3">
        <div id="button-container" class="mt-10 space-x-3">
            <button
                id="traininator"
                class="rounded-md bg-orange-700 px-3 py-2 text-3xl text-white shadow-lg"
                on:click={() => {
                    goto('/inators/traininator');
                }}>Traininator</button>
            <button
                id="inators"
                class="rounded-md bg-blue-700 px-3 py-2 text-3xl text-white shadow-lg"
                on:click={() => {
                    goto('/inators/codeinator');
                }}>Codeinator</button>
        </div>
    </div>
</div>

<style>
    #traininator, #inators {
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.613);
        transition: all 0.2s ease-in-out;
    }
    #traininator:hover, #inators:hover {
        box-shadow: 0 0 9px rgb(180, 234, 180);
        transform: scale(1.05);
    }
    #traininator:active, #inators:active {
        box-shadow: 0 0 12px rgb(101, 242, 101);
        transform: scale(1.1);
    }
</style>