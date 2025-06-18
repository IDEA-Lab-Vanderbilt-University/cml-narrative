export interface Settings {
    textPeriod: number | string;
    fontSize: string;
    audioEnabled: boolean;
}

export var defaultSettings: Settings = {
    textPeriod: 45,
    fontSize: "text-2xl",
    audioEnabled: true,
};