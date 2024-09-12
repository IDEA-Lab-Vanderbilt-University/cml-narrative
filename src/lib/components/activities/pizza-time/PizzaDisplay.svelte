<script lang="ts">

export let crust: 'thin' | 'thick' | 'cauliflower' = 'thick';
export let sauce: 'alfredo' | 'marinara' | 'spicy' | 'bbq' = 'marinara';
export let cheese: boolean = true;
export let meats: ('pepperoni' | 'shrimp' | 'bacon' | 'ham')[] = [];
export let veggies: ('mushrooms' | 'onions' | 'tomatoes' | 'peppers' | 'pineapple' | 'bolts')[] = ['bolts'];
export let finishingTouches: ('basil' | 'herbs' | 'parmesan' | 'olives' | 'jalapeno')[] = ['jalapeno', 'herbs'];
export let size: number | string = "50vh";
</script>

<div class="pizzabase" style="width: {size}; height: {size};">
<img id="crust" src={`/img/pizzaparts/${crust}crust.svg`} alt="Pizza Crust" />
<img id="sauce" src={`/img/pizzaparts/${sauce}.svg`} alt="Pizza Sauce" />
{#if cheese}
<img id="cheese" src="/img/pizzaparts/cheese.svg" alt="Pizza Cheese" />
{/if}
{#each meats as meat}
<img class="topping" id={meat} src={`/img/pizzaparts/${meat}.svg`} alt="Pizza Meat" />
{/each}
{#each veggies as veggie}
{#if veggie == 'bolts'}
<img class="topping" id={veggie} src={`/img/pizzaparts/bolts.png`} alt="Pizza Bolts" />
{:else}
<img class="topping" id={veggie} src={`/img/pizzaparts/${veggie}.svg`} alt="Pizza Veggie" />
{/if}
{/each}
{#each finishingTouches as topping}
<img class="topping" id={topping} src={`/img/pizzaparts/${topping}.svg`} alt="Pizza Topping" />
{/each}
</div>

<style>
.pizzabase {    
    position: relative;
}

.pizzabase img {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
}

.pizzabase .topping {
    position: absolute;
    top: 10%;
    left: 10%;
    height: 80%;
    max-width: 80%;
    width: fit-content;
}

#crust {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>