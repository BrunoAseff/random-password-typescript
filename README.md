# random-password-typescript

This library is a type-safe, secure, and customizable password generator for TypeScript users. It leverages TypeScript’s strict typing system, making password generation flexible, predictable, and tailored to your needs—whether you're after a basic password or something more complex.

**Note**: This library uses Node.js’s `crypto` module, so it won’t run in the browser. If you need it in a web app, consider creating an API route.

[Check it out on GitHub!](https://github.com/BrunoAseff/random-password-typescript)

## Prerequisites

You'll need:

- **Node.js** (version 14.x or higher)
- **TypeScript** (if you're working directly with TypeScript)

## Installation

Install via npm:

```bash
npm install random-password-typescript
```

## Usage

Import the `generatePassword` function and get started:

```typescript
import { generatePassword } from "random-password-typescript";

// Simple password generation
const password = generatePassword(1);
console.log(password); // Randomly generated password
```

### Generating Multiple Passwords

The first argument is a number representing how many passwords you want, and the second is an object with the customization options.

```typescript
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

Here’s a breakdown of the available options to tweak your password generation:

| Option                     | Type               | Default     | Description                                                                                    |
| -------------------------- | ------------------ | ----------- | ---------------------------------------------------------------------------------------------- |
| `length`                   | `number`           | `undefined` | Sets the exact password length.                                                                |
| `randomLength`             | `boolean`          | `false`     | If true, generates a random length within a specified range.                                   |
| `minLength`                | `number`           | `8`         | Minimum password length (if `randomLength` is true).                                           |
| `maxLength`                | `number`           | `16`        | Maximum password length (if `randomLength` is true).                                           |
| `lengthRange`              | `[number, number]` | `undefined` | Defines a range for random length generation.                                                  |
| `useNumbers`               | `boolean`          | `true`      | Include numbers in the password.                                                               |
| `useSymbols`               | `boolean`          | `true`      | Include symbols in the password.                                                               |
| `lowercaseOnly`            | `boolean`          | `false`     | Only lowercase characters.                                                                     |
| `uppercaseOnly`            | `boolean`          | `false`     | Only uppercase characters.                                                                     |
| `excludeSimilarCharacters` | `boolean`          | `false`     | Excludes visually similar characters like `oO0`, `iIl1`.                                       |
| `excludeWords`             | `string[]`         | `[]`        | Exclude specific words from appearing in the password.                                         |
| `excludeChars`             | `string[]`         | `[]`        | Exclude specific characters from the password.                                                 |
| `mustHave`                 | `string[]`         | `[]`        | Characters that must appear in the password.                                                   |
| `startsWith`               | `string`           | `""`        | Specifies a string the password must start with.                                               |
| `endsWith`                 | `string`           | `""`        | Specifies a string the password must end with.                                                 |
| `pattern`                  | `string`           | `""`        | Pattern for password generation. Use `L` for lowercase, `U` for uppercase, and `D` for digits. |

---

That’s it! Play around with the options and generate passwords tailored to your exact needs. Feel free to check out the project on [GitHub](https://github.com/BrunoAseff/random-password-typescript) for more details.
