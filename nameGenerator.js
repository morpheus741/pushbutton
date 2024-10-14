// Function to generate a random name using an adjective and a noun
function generateRandomName(ip) {
    const adjectives = [
        'Swift', 'Brave', 'Clever', 'Bold', 'Fierce', 'Quick', 'Sly', 'Mighty', 'Gentle', 'Loyal',
        'Silent', 'Thunderous', 'Agile', 'Vibrant', 'Radiant', 'Stealthy', 'Glorious', 'Savage', 'Frosty', 'Blazing',
        'Noble', 'Daring', 'Fearless', 'Eager', 'Steady', 'Tough', 'Furious', 'Luminous', 'Grand', 'Majestic',
        'Invincible', 'Fearsome', 'Relentless', 'Valiant', 'Resolute', 'Cunning', 'Wise', 'Diligent', 'Serene', 'Epic'
    ];

    const nouns = [
        'Tiger', 'Eagle', 'Bear', 'Wolf', 'Lion', 'Hawk', 'Fox', 'Shark', 'Falcon', 'Panther',
        'Dragon', 'Phoenix', 'Panther', 'Cheetah', 'Cobra', 'Rhino', 'Leopard', 'Griffin', 'Gorilla', 'Python',
        'Mammoth', 'Stallion', 'Raven', 'Bison', 'Jaguar', 'Viper', 'Orca', 'Scorpion', 'Condor', 'Buffalo'
    ];

    // Simple hash function to turn IP into an index
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
        hash = ip.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use the hash to generate an index for both the adjective and noun arrays
    const adjIndex = Math.abs(hash) % adjectives.length;
    const nounIndex = Math.abs(hash * 2) % nouns.length; // Multiply hash to spread the range

    // Combine the adjective and noun to form a unique name
    return `${adjectives[adjIndex]}${nouns[nounIndex]}`;
}
