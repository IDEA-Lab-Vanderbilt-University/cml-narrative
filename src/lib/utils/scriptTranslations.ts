/**
 * Script translations - organized by level and section
 */

export const scriptTranslations = {
	en: {
		level1: {
			main: [
				{
					id: 1,
					dialog: 'Here we are in 2075! We made it!'
				},
				{
					id: 2,
					dialog: 'All that time travel made me hungry! Let\'s see what they have to eat here. I hope in 2075 they still have pizza!'
				},
				{
					id: 3,
					dialog: 'Mmmmmm! Pizza!'
				},
				{
					id: 4,
					dialog: 'Welcome! Please have a seat and a server will be with you shortly.'
				},
				{
					id: 5,
					dialog: 'Wow, there are no humans working here! This is the first technology we can look into!'
				},
				{
					id: 6,
					dialog: 'Delicious pizza technology...'
				},
				{
					id: 7,
					dialog: 'These robots must have been trained with an algorithm on how to make and serve pizza!'
				},
				{
					id: 8,
					dialog: 'Let\'s go into the kitchen and see if we can use an algorithm to make our own pizzas.'
				},
				{
					id: 9,
					dialog: 'Hello, robot from the future–I mean regular, normal pizza chef robot! Can we try making our own pizzas using an algorithm?'
				},
				{
					id: 10,
					dialog: 'Yes you can! I\'ll help you!'
				},
				{
					id: 11,
					dialog: 'Sorry, Agent {agentName}, I almost blew our cover back there.'
				},
				{
					id: 12,
					dialog: 'Now let\'s make some pizza!'
				}
			]
		}
	},
	es: {
		level1: {
			main: [
				{
					id: 1,
					dialog: '¡Aquí estamos en 2075! ¡Lo hicimos!'
				},
				{
					id: 2,
					dialog: '¡Viajar en el tiempo me dio hambre! Veamos qué tienen para comer aquí. ¡Espero que en 2075 todavía tengan pizza!'
				},
				{
					id: 3,
					dialog: '¡Mmmmmm! ¡Pizza!'
				},
				{
					id: 4,
					dialog: 'Bienvenido. Por favor, siéntese y un servidor estará con usted en breve.'
				},
				{
					id: 5,
					dialog: '¡Guau, no hay humanos trabajando aquí! ¡Esta es la primera tecnología que podemos investigar!'
				},
				{
					id: 6,
					dialog: 'Deliciosa tecnología de pizza...'
				},
				{
					id: 7,
					dialog: '¡Estos robots deben haber sido entrenados con un algoritmo sobre cómo hacer y servir pizza!'
				},
				{
					id: 8,
					dialog: 'Vamos a la cocina y veamos si podemos usar un algoritmo para hacer nuestras propias pizzas.'
				},
				{
					id: 9,
					dialog: '¡Hola, robot del futuro, quiero decir, robot chef de pizza normal y corriente! ¿Podemos intentar hacer nuestras propias pizzas usando un algoritmo?'
				},
				{
					id: 10,
					dialog: '¡Sí puedes! ¡Te ayudaré!'
				},
				{
					id: 11,
					dialog: 'Perdón, Agente {agentName}, casi descubrimos nuestro disfraz allí.'
				},
				{
					id: 12,
					dialog: '¡Ahora hagamos pizza!'
				}
			]
		}
	}
} as const;

export type ScriptLanguage = keyof typeof scriptTranslations;
export type ScriptSection = keyof typeof scriptTranslations.en;
export type ScriptKey = keyof typeof scriptTranslations.en.level1.main | number;
