import type { Script } from '$lib/types/Script';
import type { UserData } from '$lib/types/UserData';
import { userDataStore } from '$lib/utils/stores/store';

let agent: UserData = {
	name: {
		first: '',
		last: ''
	},
	age: 0,
	interests: [],
	avatarImg: '',
	agentName: '',
	email: '',
	password: '',
	progress: {
		level: 0,
		levelLabel: '',
		subLevel: 0,
		subLevelLabel: '',
		lastUpdated: undefined
	}
};

userDataStore.subscribe((value) => {
	agent = value as UserData;
});



const script: Script = {
	lines: [
        {
            id: 1,
            speakers: ['Dash'],
            dialog: 'Hello, I am Dash. I will be your virtual guide for this training manual to help you understand how we train our cars.',
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s1.wav',
        },
        {
            id: 2,
            speakers: ['Dash'],
            dialog: 'First, we tell our cars what we want them to learn, like reading road signs, spotting people and animals on the road, or opening doors for people to get in. Which of these do we need to train our cars to be able to do?',
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s2.wav',
        },
        {
            id: 3,
            speakers: ['Dash'],
            dialog: 'To drive safely, our cars need to learn how to spot people crossing the street, find stop signs, and look at traffic lights to know when to stop and go.',
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/2.png',
            audio: '/audio/level2/dash/dash-l2s3.wav',
        },
        {
            id: 4,
            speakers: ['Dash'],
            dialog: 'Our self-driving cars are trained to open the doors when they scan a human face. Just like these faces!',
            avatars: ['/img/characters/level-2/dash/dash-dance.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s4.wav',
        },
        {
            id: 5,
            speakers: ['Dash'],
            dialog: 'To teach the cars what a face looks like, the company creates a file full of images with all the different kinds of faces they use to train the cars.  Now you try. Tap a few images to add the faces to the folder.',
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s5.wav',
        },
        {
            id: 6,
            speakers: ['Dash'],
            dialog: 'The car doors should only open when the scanner detects a human face.',
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s6.wav',
        },
        {
            id: 7,
            speakers: ['Dash'],
            dialog: 'To train the cars what is not a face, the company creates a file full of images with all  different kinds of objects that are not human faces. Now you try. Tap a few images to add the objects that are not human faces to the folder.',
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s7.wav',
        },
        {
            id: 8,
            speakers: ['Dash'],
            dialog: 'The car doors should only open when it detects a human face. Not other objects like trees.',
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s8.wav',
        },
        {
            id: 9,
            speakers: ['Dash'],
            dialog: 'We call this a TRAINING dataset because it TRAINS the cars to recognize two different classes: a human face and not a human face.',
            avatars: [''],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s9.wav',
            pos: 'center'
        },
        {
            id: 10,
            speakers: ['Dash'],
            dialog: 'With this training dataset, the cars can learn and get really good at recognizing people! This means the cars will only open the doors for humans and not other things like racoons or skunks!',
            avatars: [''],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s10.wav',
            pos: 'center'
        },
        {
            id: 11,
            speakers: ['Dash'],
            dialog: 'So, the training data becomes a set of instructions, aka an algorithm, that the cars follow. Tap on the blinking GPS  to see an algorithm our car uses.',
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/3.svg', 
            audio: '/audio/level2/dash/dash-l2s11.wav',
        },
        {
            id: 12,
            speakers: ['Dash'],
            dialog: 'Order is important in an algorithm. Drag and drop the blocks to complete the car’s instructions on the right.',
            avatars: ['/img/characters/level-2/dash/dash-dance.png'],
            background: '/img/backgrounds/level2/car-training/3.svg',
            audio: '/audio/level2/dash/dash-l2s12.wav',
        },
        {
            id: 13,
            speakers: ['Dash'],
            dialog: 'Now that we have our algorithm and training data set, let\'s test it. When we test our algorithm, we have to use a TEST DATA SET that has  different images than the training data set',
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s13.wav',
        },
        {
            id: 14,
            speakers: ['Dash'],
            dialog: 'Testing the algorithm with the same images from the training data set is like giving the cars the answers to the test. So to test if the car’s algorithm can work outside our factory, we have to test with images that the cars were not trained with',
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s14.wav',
        },
        {
            id: 15,
            speakers: ['Dash'],
            dialog: 'We use different faces because human faces can be different, and we want everyone to be able to use our cars! All new “face” and “no face” images are called TEST DATA.',
            avatars: ['/img/characters/level-2/dash/dash-thumb-flipped.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s15.wav',
        },
        {
            id: 16,
            speakers: ['Dash'],
            dialog: 'Lets test our face scan algorithm to see if it can detect a human face. Drag one of the test images onto the scanner to test',
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s16.wav',
        },
        {
            id: 17,
            speakers: ['Dash'],
            dialog: 'Now, let\'s test our face scan algorithm to see if can detect objects that are not human faces. Drag one of the test images onto the scanner to test',
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/dash-l2s17.wav',
        },
        {
            id: 18,
            speakers: ['Dash'],
            dialog: 'And that’s how we train our cars here at Vroom Vroom. You did a “Dash-tastic” Job! Come back soon!',
            avatars: ['/img/characters/level-2/dash/dash-thumbs-flipped.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
        },
    ]
};

export default script;