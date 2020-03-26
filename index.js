import { FuzzyMatcher } from "wasm-fuzzy-match";
import faker from 'faker';

const phrases = [
  "Let me freshin' it up little one on one with no ruff (let's go)",
  "When I hear what they have to say about me",
  "I know that he loves me cause he told me so",
];

function replaceChar(string) {
  const char = string.charAt(Math.floor(Math.random() * string.length));
  if (char === ' ') return string;
  const charCode = char.charCodeAt(0) + (Math.random() - 0.5) * 2;
  return `${string.replace(char, String.fromCharCode(charCode))}`;
}

function generateName() {
  const string = `${faker.random.alphaNumeric(3)} ${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.random.alphaNumeric(6)}`;
  const randomInt = Math.floor(Math.random() * 9);
  let result = string;
  for (var i = 0, l = randomInt; i <= l; i++) {
    result = replaceChar(result);
  }
  return result;
}

const COUNT = 100000;

console.time("Generate Phrases");
for (var i = 0, l = COUNT; i < l; i++) {
  if (i % 100000 === 0) console.log(i);
  phrases.push(generateName());
}
console.timeEnd("Generate Phrases");

const setOfPhrases = new Set(phrases);

const indexingStart = performance.now();
const matcher = new FuzzyMatcher(phrases);
const element = document.createElement("div");
element.innerHTML = `Indexed ${setOfPhrases.size} unique items in ${performance.now() - indexingStart} ms`;
document.querySelector("body").prepend(element);

function queryCollection() {
  const queryStart = performance.now();
  const value = document.getElementById("query-input").value;
  const results = matcher.query(value);
  console.log("results: ", results);
  document
    .getElementById("query-duration")
    .innerHTML = `Found ${results.split(" ").length} in ${performance.now() - queryStart} ms`;
  let matchedPhrases = results.split(" ")
      .map(v => parseInt(v, 10))
      .map(key => `${phrases[key]}</br>`);
  document.getElementById("query-results").innerHTML = matchedPhrases;
}

document.getElementById("query-trigger").addEventListener("click", queryCollection);
