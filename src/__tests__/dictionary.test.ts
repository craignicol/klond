import * as Dictionary from '../dictionary';

test("dictionary has 370103 words", () => {
  const sut = Dictionary.getWords();
  expect(sut.size).toBe(370103);
});

test("Svelte is in dictionary", () => {
  expect(Dictionary.isWord("Svelte")).toBe(true);
});

test("Nottinghamshire is not in dictionary", () => {
  expect(Dictionary.isWord("Nottinghamshire")).toBe(false);
});

test("word score is based on length only", () => {
  expect(Dictionary.wordScore("a")).toBe(1);
  expect(Dictionary.wordScore("aa")).toBe(2);
  expect(Dictionary.wordScore("aaa")).toBe(4);
  expect(Dictionary.wordScore("aaaa")).toBe(8);
  expect(Dictionary.wordScore("aaaaa")).toBe(16);
  expect(Dictionary.wordScore("aaaaaa")).toBe(32);
  expect(Dictionary.wordScore("aaaaaaa")).toBe(64);
  expect(Dictionary.wordScore("aaaaaaaa")).toBe(128);
  expect(Dictionary.wordScore("aaaaaaaaa")).toBe(256);
  expect(Dictionary.wordScore("aaaaaaaaaa")).toBe(512);
  expect(Dictionary.wordScore("aaaaaaaaaaa")).toBe(1024);
  expect(Dictionary.wordScore("aaaaaaaaaaaa")).toBe(2048);
  expect(Dictionary.wordScore("aaaaaaaaaaaaa")).toBe(4096);
});