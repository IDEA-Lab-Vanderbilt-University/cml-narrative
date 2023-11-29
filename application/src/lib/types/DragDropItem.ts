export interface DragDropItem {
	el?: any;
	id: number;
	itemId: string;
	title: string;
	img: string;
}

export interface HarmfulHelpfulStoreItem {
	harmful: DragDropItem[];
	helpful: DragDropItem[];
	reasoning: HarmfulHelpfulReasoningItem[];
}

export interface HarmfulHelpfulItem {
	id: number;
	itemId: string;
	title: string;
	type: 'harmful' | 'helpful';
}

export interface HarmfulHelpfulReasoningItem {
	id: number;
	type: 'harmful' | 'helpful';
	reasonText: string;
	reasonVideo: string;
}
