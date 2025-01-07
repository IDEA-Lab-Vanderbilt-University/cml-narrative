<script lang="ts">
    export let onSelect: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
</script>

<ul id="boosters">
    <li><input type="radio" id="none" name="booster" value="none" checked on:change={onSelect}><label for="none">None</label></li>
    <li><input type="radio" id="rotate" name="booster" value="rotate" on:change={onSelect}><label for="rotate">Rotate</label></li>
    <li><input type="radio" id="flip" name="booster" value="flip" on:change={onSelect}><label for="flip">Reflect</label></li>
    <li><input type="radio" id="adjust" name="booster" value="adjust" on:change={onSelect}><label for="adjust">Recolor</label></li>
</ul>

<style>
    #boosters {
        list-style-type: none;
        padding: 0;
    }

    #boosters input[type="radio"] {
        display: none;
    }

    #boosters input[type="radio"] + label {
        color: #eee;
        cursor: pointer;
        font-size: 1.5rem;
        width: 100%;
        margin: 1vh auto;
        text-align: center;
        background-color: #f0f0f01d;
        border-radius: 10px;
        transition: 0.3s;
        display: block;
        user-select: none;
    }

    #boosters input[type="radio"]:hover + label {
        background-color: #f0f0f0d1;
        color: #000;
    }

    #boosters input[type="radio"]:active + label {
        background-color: #f0f0f0;
        color: #000;
    }

    #boosters input[type="radio"]:checked + label {
        background-color: #50107a;
        color: #eee;
    }   
</style>