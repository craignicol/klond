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