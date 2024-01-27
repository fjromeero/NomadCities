export function randomStringGenerator(k = 32) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < k; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        result += alphabet.charAt(randomIndex);
    }

    return result;
}

export function randomEmailGenerator() {
    const username = randomStringGenerator(10);
    const domain = randomStringGenerator(5);
    return `${username}@${domain}.com`;
}