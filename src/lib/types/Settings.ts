export interface Settings {
    textPeriod: number;
    fontSize: string;
    audioEnabled: boolean;
}

export var defaultSettings: Settings = {
    textPeriod: 30,
    fontSize: "text-2xl",
    audioEnabled: true,
};