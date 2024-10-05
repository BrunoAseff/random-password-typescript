import { randomInt } from "crypto";
const CHAR_SETS = {
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}|;:,.<>?/~",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    similarCharacters: "oO0iIl1|",
};
function removeSimilarChars(characters) {
    return characters
        .split("")
        .filter((char) => !CHAR_SETS.similarCharacters.includes(char))
        .join("");
}
function getRandomChar(charSet) {
    const randomIndex = randomInt(0, charSet.length);
    return charSet[randomIndex];
}
function generateRandomLength({ minLength, maxLength, lengthRange, }) {
    if (lengthRange) {
        return randomInt(lengthRange[0], lengthRange[1] + 1);
    }
    if (minLength && maxLength) {
        return randomInt(minLength, maxLength + 1);
    }
    return 10;
}
function shuffleString(str) {
    return str
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}
function validateOptions(options) {
    const { startsWith = "", endsWith = "", mustHave = [], excludeChars = [], pattern, length, lowercaseOnly, uppercaseOnly, } = options;
    const conflicts = mustHave.some((item) => Array.isArray(item)
        ? item.some((char) => excludeChars.includes(char))
        : excludeChars.includes(item));
    if (conflicts) {
        throw new Error("Conflict between mustHave and excludeChars: can't both include and exclude the same characters.");
    }
    if (startsWith.split("").some((char) => excludeChars.includes(char)) ||
        endsWith.split("").some((char) => excludeChars.includes(char))) {
        throw new Error("Conflict between startsWith/endsWith and excludeChars: can't both include and exclude the same characters.");
    }
    if (lowercaseOnly && uppercaseOnly) {
        throw new Error("Conflict: 'lowercaseOnly' and 'uppercaseOnly' cannot both be true.");
    }
    if (pattern && typeof length === "number" && length < pattern.length) {
        throw new Error(`Length of the password (${length}) is smaller than the pattern length (${pattern.length}).`);
    }
    if (pattern && !length) {
        options.length = pattern.length;
    }
}
function generateFromPattern(pattern) {
    let result = "";
    for (const char of pattern) {
        if (char === "U") {
            result += getRandomChar(CHAR_SETS.uppercase);
        }
        else if (char === "D") {
            result += getRandomChar(CHAR_SETS.numbers);
        }
        else if (char === "L") {
            result += getRandomChar(CHAR_SETS.lowercase);
        }
        else {
            result += char;
        }
    }
    return result;
}
export function generatePassword(numberOfPasswords, options = {}) {
    const { length, // Remove default here
    randomLength, minLength = 8, maxLength = 16, lengthRange, useNumbers = true, useSymbols = true, lowercaseOnly = false, uppercaseOnly = false, excludeSimilarCharacters = false, excludeWords = [], excludeChars = [], mustHave = [], startsWith = "", endsWith = "", pattern = "", } = options;
    validateOptions(options);
    let charSet = "";
    if (useNumbers)
        charSet += CHAR_SETS.numbers;
    if (useSymbols)
        charSet += CHAR_SETS.symbols;
    if (lowercaseOnly) {
        charSet = CHAR_SETS.lowercase;
    }
    else if (uppercaseOnly) {
        charSet = CHAR_SETS.uppercase;
    }
    else {
        charSet += CHAR_SETS.lowercase + CHAR_SETS.uppercase;
    }
    if (excludeSimilarCharacters) {
        charSet = removeSimilarChars(charSet);
    }
    if (excludeChars.length > 0) {
        charSet = charSet
            .split("")
            .filter((char) => !excludeChars.includes(char))
            .join("");
    }
    if (!charSet.length) {
        throw new Error("Character set is empty after applying exclusions.");
    }
    function createPassword() {
        let finalLength = randomLength
            ? generateRandomLength({ minLength, maxLength, lengthRange })
            : length;
        // Calculate minimum required length from mustHave, startsWith, and endsWith
        const requiredLength = mustHave.join("").length + startsWith.length + endsWith.length;
        // If length is not provided, adjust it to the required length
        if (typeof finalLength === "undefined") {
            finalLength = Math.max(10, requiredLength);
        }
        // If the defined length is less than the required length, throw an error
        if (finalLength < requiredLength) {
            throw new Error(`The length provided (${finalLength}) is not sufficient to fit all required characters (mustHave, startsWith, endsWith). Minimum required length is ${requiredLength}.`);
        }
        if (pattern) {
            return generateFromPattern(pattern);
        }
        let password = startsWith; // Ensure startsWith is added at the beginning
        let remainingChars = finalLength - password.length - endsWith.length;
        // Insert mustHave characters first, ensuring startsWith remains untouched
        const mustHaveChars = shuffleString(mustHave.join(""));
        for (const char of mustHaveChars) {
            if (remainingChars > 0) {
                password += char;
                remainingChars--;
            }
        }
        // Fill the remaining characters with random chars from charSet
        while (remainingChars > 0) {
            password += getRandomChar(charSet);
            remainingChars--;
        }
        password += endsWith; // Add endsWith at the end
        // Check if any excluded words are present
        const passwordLowerCase = password.toLowerCase();
        if (excludeWords.some((word) => passwordLowerCase.includes(word.toLowerCase()))) {
            return createPassword(); // Retry if any excluded words are found
        }
        return password;
    }
    if (numberOfPasswords === 1) {
        return createPassword();
    }
    return Array.from({ length: numberOfPasswords }, createPassword);
}
