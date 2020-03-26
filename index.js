import { FuzzyMatcher } from "wasm-fuzzy-match";

const phrases = [
  "Let me freshin' it up little one on one with no ruff (let's go)",
  "When I hear what they have to say about me",
  "I know that he loves me cause he told me so",
];

const matcher = new FuzzyMatcher(phrases);
const result = matcher.query("know", 0);

console.log(result);
