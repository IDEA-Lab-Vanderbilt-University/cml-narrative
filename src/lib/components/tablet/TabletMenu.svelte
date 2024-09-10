<script lang="ts">


    export let onSelect: (selection: null | "profile" | "travelLog" | "badges") => void;

</script>



<div>
    Profiles
    Travel Log
    Badges
</div>

<style>
    div {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 1rem;
        border-radius: 1rem;
    }
</style>
