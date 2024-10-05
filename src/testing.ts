import { generatePassword } from "./password";

console.log(
  generatePassword(1, {
    randomLength: true,
    minLength: 33,
    maxLength: 55,
    endsWith: "YZ",
    startsWith: "AB",
    pattern: "DD-LL-LL",
  })
);
