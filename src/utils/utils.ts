export function capitalize(text: string): string {
    if (!text) return text
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function isOnlyLetters(text: string): boolean {
    return /^[a-zA-Z\s]+$/.test(text);
}