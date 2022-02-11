import * as Dictionary from '../dictionary';

test("dictionary has 370103 words", () => {
  const sut = Dictionary.getWords();
  expect(sut.size).toBe(370103);
});