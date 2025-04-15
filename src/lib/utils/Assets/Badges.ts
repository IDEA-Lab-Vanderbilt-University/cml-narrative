export type BadgeType = {
    name: string;
    image: string;
    description: string;
};

export const Badges: BadgeType[] = [
    {
        name: "Agent-In-Training", 
        image: "/img/misc/badge1.png",
        description: "You've joined the SPOT agency! You are now an Agent-In-Training!",
    },
    {
        name: "Algorithm All Stars",
        image: "/img/misc/badge2.png",
        description: "You've learned about algorithms and how they work! You are now an Algorithm All Star!",
    },
    {
        name: "Machine Learning Master",  
        image: "/img/misc/badge3.png",
        description: "You've trained and tested a machine learning model! You are now a Machine Learning Master!",
    },
    {
        name: "Bias Buster", 
        image: "/img/misc/badge4.png",
        description: "You've learned about bias and how to avoid it! You are now a Bias Buster!",
    },
    {
        name: "Junior Agent",
        image: "/img/misc/badge5.png", 
        description: "You've returned from your first mission! You are now a Junior Agent!",
    },
];

export const BadgesByName = {
    "Agent-In-Training": Badges[0],
    "Algorithm All Stars": Badges[1],
    "Machine Learning Master": Badges[2],
    "Bias Buster": Badges[3],
    "Junior Agent": Badges[4],
};