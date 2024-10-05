# random-password-typescript

This project aims to provide a type-safe, secure, and versatile password generator specifically designed for TypeScript users. By leveraging TypeScript's strict typing system, we ensure that password generation is done with clear, predictable, and flexible options. Whether you need a simple password or a highly complex one, this library offers a complete set of customizable options to fit your specific requirements.

## Prerequisites

To use this library, you'll need:

- **Node.js** (version 14.x or higher recommended)
- **TypeScript** (if working directly with TypeScript)

## Installation

To install the package, run:

```bash
npm install random-password-typescript
```

or

```bash
yarn add password-generator-lib
```

## Usage

Import the `generatePassword` function into your code and customize the password using the options you need.

```typescript
import { generatePassword } from "password-generator-lib";

// Simple password generation
const password = generatePassword(1);
console.log(password); // Randomly generated password

// Generate multiple passwords with options
const passwords = generatePassword(5, {
  length: 12,
  useNumbers: true,
  useSymbols: true,
  mustHave: ["@", "1"],
  startsWith: "MyP@ss",
  endsWith: "!",
});
console.log(passwords); // Array of 5 passwords
```

## Options

Here is a list of all the available options you can use to customize password generation:

| Option                     | Type               | Default     | Description                                                                                                |
| -------------------------- | ------------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `length`                   | `number`           | `undefined` | Defines the exact length of the password.                                                                  |
| `randomLength`             | `boolean`          | `false`     | If `true`, generates a random length within a defined range.                                               |
| `minLength`                | `number`           | `8`         | Minimum length of the password (used if `randomLength` is `true`).                                         |
| `maxLength`                | `number`           | `16`        | Maximum length of the password (used if `randomLength` is `true`).                                         |
| `lengthRange`              | `[number, number]` | `undefined` | Defines a specific range for random length generation.                                                     |
| `useNumbers`               | `boolean`          | `true`      | Includes numbers in the password.                                                                          |
| `useSymbols`               | `boolean`          | `true`      | Includes symbols in the password.                                                                          |
| `lowercaseOnly`            | `boolean`          | `false`     | Generates password using only lowercase characters.                                                        |
| `uppercaseOnly`            | `boolean`          | `false`     | Generates password using only uppercase characters.                                                        |
| `excludeSimilarCharacters` | `boolean`          | `false`     | Excludes similar characters like `oO0iIl1`.                                                                |
| `excludeWords`             | `string[]`         | `[]`        | Excludes specific words or phrases from appearing in the password.                                         |
| `excludeChars`             | `string[]`         | `[]`        | Excludes specific characters from the password.                                                            |
| `mustHave`                 | `string[]`         | `[]`        | Requires specific characters to appear in the password.                                                    |
| `startsWith`               | `string`           | `""`        | Specifies a string that the password must start with.                                                      |
| `endsWith`                 | `string`           | `""`        | Specifies a string that the password must end with.                                                        |
| `pattern`                  | `string`           | `""`        | Specifies a pattern for password generation. Use `L` for lowercase, `U` for uppercase, and `D` for digits. |

### Option Details

- **length**: Defines the fixed length of the password.
- **randomLength**: If enabled, the password length will be randomly chosen within a specified range.
- **minLength** and **maxLength**: These values define the lower and upper bounds of the random password length.
- **lengthRange**: Alternative to minLength and maxLength, where you can specify the exact range as an array (e.g., `[8, 12]`).
- **useNumbers** and **useSymbols**: Determines if numbers (`0-9`) or symbols (like `@`, `#`, etc.) should be included.
- **lowercaseOnly** and **uppercaseOnly**: Restrict the password to only lowercase or only uppercase characters.
- **excludeSimilarCharacters**: Excludes visually similar characters (e.g., `0` and `O`, `1` and `l`).
- **excludeWords**: List of words that should not appear in the password (case-insensitive).
- **excludeChars**: List of characters that should not be included in the password.
- **mustHave**: List of characters that must appear in the password.
- **startsWith** and **endsWith**: Forces the password to begin or end with a specific string.
- **pattern**: If set, the password will be generated following the pattern. Use `L` for lowercase, `U` for uppercase, and `D` for digits.

## Examples

### 1. Generate a simple password with default settings

```typescript
const password = generatePassword(1);
console.log(password); // Example: 'A9lD#oP8'
```

### 2. Generate a password with a specific length and required characters

```typescript
const password = generatePassword(1, {
  length: 12,
  useSymbols: true,
  mustHave: ["!", "1"],
  startsWith: "Start",
});
console.log(password); // Example: 'Start5z!1P@W'
```

### 3. Generate multiple passwords with random lengths

```typescript
const passwords = generatePassword(3, {
  randomLength: true,
  lengthRange: [8, 12],
  useNumbers: true,
  useSymbols: false,
});
console.log(passwords); // Example: ['aBcD1234', 'XYZaBc9', 'wxy123AB']
```

### 4. Generate password with exclusions

```typescript
const password = generatePassword(1, {
  length: 10,
  excludeChars: ["a", "A", "1"],
  excludeSimilarCharacters: true,
});
console.log(password); // Example: 'B2l$zDnW7'
```

### 5. Generate a password using a custom pattern

```typescript
const password = generatePassword(1, {
  pattern: "LULD-ULDD",
});
console.log(password); // Example: 'a1B3-xC97'
```
