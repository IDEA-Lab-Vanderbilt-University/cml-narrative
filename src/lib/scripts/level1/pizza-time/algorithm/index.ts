import type { Script } from '$lib/types/Script';

export const script: Script = {
    lines: [
        {
            id: 1,
            speakers: ['Chef Bot'],
            dialog:
                'First things first. Order is important in an algorithm. Drag and drop the instructions into the correct order.',
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s1.wav',
        },
        {
            id: 2,
            speakers: ['Chef Bot'],
            dialog:
                'Oh dear! The order of the algorithm is not quite right. Let\'s try again!',
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s2.wav',
        },
        {
            id: 3,
            speakers: ['Chef Bot'],
            dialog:
                'This looks good! Our robot chefs will definitely be able to make this pizza. But our robot chefs will need more specific instructions...',
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s3.wav',
        },
        {
            id: 4,
            speakers: ['Chef Bot'],
            dialog:
                'If/then statements help machines understand the order of your algorithm. Drag and drop the [If] and [Then] blocks in the correct places in the algorithm.',
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s4.wav',
        },
        {
            id: 5,
            speakers: ['Chef Bot'],
            dialog:
                'With the instructions in this algorithm we can make the pizza exactly how you want it! I\'ll get started right away! Have a seat and we will bring it out when it\'s ready.',
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s5.wav',
        }
    ],
};