export interface Settings {
    textPeriod: number | string;
    fontSize: string;
    audioEnabled: boolean;
    // Default to undefined, only store a value if the user has explicitly chosen a language
    language?: string;
}

export var defaultSettings: Settings = {
    textPeriod: 45,
    fontSize: "text-2xl",
    audioEnabled: true,
};