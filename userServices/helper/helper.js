exports.generateUserFriendlyPassword = (username) => {
    const specials = '@#$&*';
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const numbers = '0123456789';

    // Helper function to randomly select an element from an array
    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Generate a random special character
    function randomSpecial() {
        return randomChoice(specials);
    }

    // Generate a random vowel
    function randomVowel() {
        return randomChoice(vowels);
    }

    // Generate a random consonant
    function randomConsonant() {
        return randomChoice(consonants);
    }

    // Generate a random number
    function randomNumber() {
        return randomChoice(numbers);
    }

    // Start with the username
    let password = username.toLowerCase().replace(/\s/g, '');

    // Calculate the remaining length after considering username and other requirements
    const remainingLength = 10 - password.length;

    // Ensure at least one special character is present
    password += randomSpecial();

    // Add vowels
    for (let i = 0; i < Math.ceil((remainingLength - 1) / 4); i++) {
        password += randomVowel();
    }

    // Add consonants
    for (let i = 0; i < Math.ceil((remainingLength - 1) / 4); i++) {
        password += randomConsonant();
    }

    // Add numbers
    for (let i = 0; i < Math.ceil((remainingLength - 1) / 4); i++) {
        password += randomNumber();
    }

    // Shuffle the characters in the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    // Trim the password to the fixed length
    password = password.slice(0, 10);

    return password;
}


