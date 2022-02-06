import { Shuffle } from '../deck';

test("new deck has 52 cards", () => {
  const sut = Shuffle(0);
  expect(sut.length).toBe(52);
});