export type Crust = 'thin' | 'thick' | 'cauliflower';
export type Sauce = 'alfredo' | 'marinara' | 'spicy' | 'bbq';
export type MeatTopping = 'pepperoni' | 'shrimp' | 'bacon' | 'ham';
export type VeggieTopping = 'mushrooms' | 'onions' | 'tomatoes' | 'peppers' | 'pineapple' | 'bolts';
export type FinishingTouch = 'basil' | 'herbs' | 'parmesan' | 'olives' | 'jalapeno';
export type PizzaConfig = {
    crust: Crust;
    sauce: Sauce | null;
    cheese: boolean;
    meats: MeatTopping[];
    veggies: VeggieTopping[];
    finishingTouches: FinishingTouch[];
};