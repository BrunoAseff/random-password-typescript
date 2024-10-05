import { generatePassword } from "./password";
describe("generatePassword", () => {
    it("should generate a password with the default length of 10", () => {
        const password = generatePassword(1); // Assuming it returns a single string
        expect(password).toHaveLength(10);
    });
    it("should generate a password with a specified length", () => {
        const password = generatePassword(1, { length: 12 }); // No destructuring needed
        expect(password).toHaveLength(12);
    });
    it("should throw an error if mustHave characters conflict with excludeChars", () => {
        expect(() => generatePassword(1, {
            mustHave: ["A"],
            excludeChars: ["A"],
        })).toThrow("Conflict between mustHave and excludeChars");
    });
    it("should generate a password based on a given pattern", () => {
        const pattern = "UUU-DDD-LLL"; // Example pattern: 3 uppercase, 3 digits, 3 lowercase letters
        const password = generatePassword(1, { pattern }); // Assuming it returns a single string
        expect(password).toMatch(/^[A-Z]{3}-\d{3}-[a-z]{3}$/);
    });
    it("should generate a password with excluded similar characters", () => {
        const password = generatePassword(1, {
            excludeSimilarCharacters: true,
        }); // Assuming it returns a single string
        // Ensure none of the similar characters are included
        const similarChars = ["o", "O", "0", "i", "I", "l", "1", "|"];
        similarChars.forEach((char) => {
            expect(password).not.toContain(char);
        });
    });
    it("should generate a password within a random length range", () => {
        const password = generatePassword(1, {
            randomLength: true,
            lengthRange: [10, 15],
        }); // Assuming it returns a single string
        expect(password.length).toBeGreaterThanOrEqual(10);
        expect(password.length).toBeLessThanOrEqual(15);
    });
    it("should generate a password with must-have characters", () => {
        const password = generatePassword(1, {
            mustHave: ["A", "1", "!"],
        }); // Assuming it returns a single string
        expect(password).toContain("A");
        expect(password).toContain("1");
        expect(password).toContain("!");
    });
    it("should throw an error when both lowercaseOnly and uppercaseOnly are true", () => {
        expect(() => {
            generatePassword(1, {
                lowercaseOnly: true,
                uppercaseOnly: true,
            });
        }).toThrowError(new Error("Conflict: 'lowercaseOnly' and 'uppercaseOnly' cannot both be true."));
    });
    it("should generate a password with specific start and end characters", () => {
        const password = generatePassword(1, {
            startsWith: "AB",
            endsWith: "YZ",
        }); // Assuming it returns a single string
        expect(password.startsWith("AB")).toBeTruthy();
        expect(password.endsWith("YZ")).toBeTruthy();
    });
    it("should not contain excluded words", () => {
        const password = generatePassword(1, {
            excludeWords: ["password"],
        }); // Assuming it returns a single string
        expect(password.toLowerCase()).not.toContain("password");
    });
    it("should regenerate if excluded words are found", () => {
        const spy = jest.spyOn(Math, "random").mockReturnValueOnce(0); // Simulate generating a password with the excluded word
        const password = generatePassword(1, {
            excludeWords: ["test"],
        }); // Assuming it returns a single string
        expect(password).not.toContain("test");
        spy.mockRestore();
    });
    it("should return an array of passwords if numberOfPasswords > 1", () => {
        const passwords = generatePassword(3, { length: 10 }); // Assuming it returns an array of strings
        expect(passwords).toHaveLength(3);
        passwords.forEach((password) => expect(password).toHaveLength(10));
    });
});
