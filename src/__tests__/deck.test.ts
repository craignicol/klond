import { Shuffle, Sample, Letter, Deal } from '../deck';

test("new deck has 52 cards", () => {
  const sut = Shuffle(0);
  expect(sut.length).toBe(52);
});

test("sampling is correct", () => {
  expect(Sample(0)).toBe(Letter.A);
  expect(Sample(1)).toBe(Letter.A);
  expect(Sample(2)).toBe(Letter.A);
  expect(Sample(3)).toBe(Letter.A);
  expect(Sample(4)).toBe(Letter.A);
  expect(Sample(5)).toBe(Letter.A);
  expect(Sample(6)).toBe(Letter.A);
  expect(Sample(7)).toBe(Letter.A);
  expect(Sample(8)).toBe(Letter.A);
  expect(Sample(9)).toBe(Letter.B);
  expect(Sample(10)).toBe(Letter.C);
  expect(Sample(11)).toBe(Letter.C);
  expect(Sample(12)).toBe(Letter.C);
  expect(Sample(13)).toBe(Letter.D);
  expect(Sample(14)).toBe(Letter.D);
  expect(Sample(15)).toBe(Letter.D);
  expect(Sample(16)).toBe(Letter.D);
  expect(Sample(17)).toBe(Letter.E);
  expect(Sample(18)).toBe(Letter.E);
  expect(Sample(19)).toBe(Letter.E);
  expect(Sample(20)).toBe(Letter.E);
  expect(Sample(21)).toBe(Letter.E);
  expect(Sample(22)).toBe(Letter.E);
  expect(Sample(23)).toBe(Letter.E);
  expect(Sample(24)).toBe(Letter.E);
  expect(Sample(25)).toBe(Letter.E);
  expect(Sample(26)).toBe(Letter.E);
  expect(Sample(27)).toBe(Letter.E);
  expect(Sample(28)).toBe(Letter.E);
  expect(Sample(29)).toBe(Letter.E);
  expect(Sample(30)).toBe(Letter.F);
  expect(Sample(31)).toBe(Letter.F);
  expect(Sample(32)).toBe(Letter.G);
  expect(Sample(33)).toBe(Letter.G);
  expect(Sample(34)).toBe(Letter.H);
  expect(Sample(35)).toBe(Letter.H);
  expect(Sample(36)).toBe(Letter.H);
  expect(Sample(37)).toBe(Letter.H);
  expect(Sample(38)).toBe(Letter.H);
  expect(Sample(39)).toBe(Letter.H);
  expect(Sample(40)).toBe(Letter.I);
  expect(Sample(41)).toBe(Letter.I);
  expect(Sample(42)).toBe(Letter.I);
  expect(Sample(43)).toBe(Letter.I);
  expect(Sample(44)).toBe(Letter.I);
  expect(Sample(45)).toBe(Letter.I);
  expect(Sample(46)).toBe(Letter.I); // Note no J when enumerating integers
  expect(Sample(47)).toBe(Letter.K);
  expect(Sample(48)).toBe(Letter.L);
  expect(Sample(49)).toBe(Letter.L);
  expect(Sample(50)).toBe(Letter.L);
  expect(Sample(51)).toBe(Letter.L);
  expect(Sample(52)).toBe(Letter.M);
  expect(Sample(53)).toBe(Letter.M);
  expect(Sample(54)).toBe(Letter.M);
  expect(Sample(55)).toBe(Letter.N);
  expect(Sample(56)).toBe(Letter.N);
  expect(Sample(57)).toBe(Letter.N);
  expect(Sample(58)).toBe(Letter.N);
  expect(Sample(59)).toBe(Letter.N);
  expect(Sample(60)).toBe(Letter.N);
  expect(Sample(61)).toBe(Letter.O);
  expect(Sample(62)).toBe(Letter.O);
  expect(Sample(63)).toBe(Letter.O);
  expect(Sample(64)).toBe(Letter.O);
  expect(Sample(65)).toBe(Letter.O);
  expect(Sample(66)).toBe(Letter.O);
  expect(Sample(67)).toBe(Letter.O);
  expect(Sample(68)).toBe(Letter.O);
  expect(Sample(69)).toBe(Letter.P);
  expect(Sample(70)).toBe(Letter.P); // Note no Q when enumerating integers
  expect(Sample(71)).toBe(Letter.R);
  expect(Sample(72)).toBe(Letter.R);
  expect(Sample(73)).toBe(Letter.R);
  expect(Sample(74)).toBe(Letter.R);
  expect(Sample(75)).toBe(Letter.R);
  expect(Sample(76)).toBe(Letter.R);
  expect(Sample(77)).toBe(Letter.S);
  expect(Sample(78)).toBe(Letter.S);
  expect(Sample(79)).toBe(Letter.S);
  expect(Sample(80)).toBe(Letter.S);
  expect(Sample(81)).toBe(Letter.S);
  expect(Sample(82)).toBe(Letter.S);
  expect(Sample(83)).toBe(Letter.T);
  expect(Sample(84)).toBe(Letter.T);
  expect(Sample(85)).toBe(Letter.T);
  expect(Sample(86)).toBe(Letter.T);
  expect(Sample(87)).toBe(Letter.T);
  expect(Sample(88)).toBe(Letter.T);
  expect(Sample(89)).toBe(Letter.T);
  expect(Sample(90)).toBe(Letter.T);
  expect(Sample(91)).toBe(Letter.T);
  expect(Sample(92)).toBe(Letter.U);
  expect(Sample(93)).toBe(Letter.U);
  expect(Sample(94)).toBe(Letter.U);
  expect(Sample(95)).toBe(Letter.V);
  expect(Sample(96)).toBe(Letter.W);
  expect(Sample(97)).toBe(Letter.W); // Note no X when enumerating integers
  expect(Sample(98)).toBe(Letter.Y);
  expect(Sample(99)).toBe(Letter.Y);
  expect(Sample(100)).toBe(Letter.Z);
});

test('Multiple runs are different', () => {
  expect(Shuffle(1)).not.toEqual(Shuffle(2));
});

test('layout contains 7 columns and discard', () => {
  const layout = Deal(Shuffle(1));
  expect(layout.columns.length).toBe(7);
  expect(layout.columns[0].length).toBe(7);
  expect(layout.columns[1].length).toBe(6);
  expect(layout.columns[2].length).toBe(5);
  expect(layout.columns[3].length).toBe(4);
  expect(layout.columns[4].length).toBe(3);
  expect(layout.columns[5].length).toBe(2);
  expect(layout.columns[6].length).toBe(1);
  expect(layout.discard.length).toBe(24);
});

test('deal does not alter deck', () => {
  let deck = Shuffle(2);
  Deal(deck);
  expect(deck.length).toEqual(52);
})