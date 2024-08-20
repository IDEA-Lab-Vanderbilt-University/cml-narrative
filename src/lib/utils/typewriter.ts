/**
 * Typewriter effect for dialogue text
 * @param node Element to display text in
 * @param targetText Full text to "type"
 * @param period Time between each character
 * @param startIndex Index in targetText to start at
 * @returns Interval timer for typing effect
 */
export default function typewriter(node: HTMLElement, targetText: string, period: number, startIndex: number = 0, onFinish: () => void = () => {}) : NodeJS.Timer {
    const text = targetText;

    node.textContent = '';

    let i = startIndex;
    const interval = setInterval(() => {
        node.textContent = text.substring(0, ++i);

        if (i === text.length) {
            clearInterval(interval);
            onFinish();
        }
    }, period);

    return interval;
}
