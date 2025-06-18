export type BadgeType = {
    name: string;
    image: string;
    description: string;
    count?: number;
};

export const Badges: BadgeType[] = [
    {
        name: "Agent-In-Training", 
        image: "/img/misc/badge1new.png",
        description: "You've joined the SPOT agency! You are now an Agent-In-Training!",
        count: 1,
    },
    {
        name: "Algorithm All Stars",
        image: "/img/misc/badge1new.png",
        description: "You've learned about algorithms and how they work! You are now an Algorithm All Star!",
        count: 2,
    },
    {
        name: "Machine Learning Master",  
        image: "/img/misc/badgemaster.png",
        description: "You've trained and tested a machine learning model! You are now a Machine Learning Master!",
        count: 3,
    },
    {
        name: "Bias Buster", 
        image: "/img/misc/badge2new.png",
        description: "You've learned about bias and how to avoid it! You are now a Bias Buster!",
        count: 4,
    },
    {
        name: "Junior Agent",
        image: "/img/misc/badge2new.png",
        description: "You've returned from your first mission! You are now a Junior Agent!",
        count: 5,
    },
];

export const BadgesByName = {
    "Agent-In-Training": Badges[0],
    "Algorithm All Stars": Badges[1],
    "Machine Learning Master": Badges[2],
    "Bias Buster": Badges[3],
    "Junior Agent": Badges[4],
};