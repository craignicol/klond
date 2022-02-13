export enum Letter {
    A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
}

// Taken from Wikipedia, so may be slightly biased towards US English, which will underestimate 
// the probability of certain letters such as 'U'
// These are percentages so add up to 100
const frequencies = [
  8.167, //: Letter.A,
  1.492, //: Letter.B,
  2.782, //: Letter.C,
  4.253, //: Letter.D,
  12.702, //: Letter.E,
  2.228, //: Letter.F,
  2.015, //: Letter.G,
  6.094, //: Letter.H,
  6.966, //: Letter.I,
  0.153, //: Letter.J,
  0.772, //: Letter.K,
  4.025, //: Letter.L,
  2.406, //: Letter.M,
  6.749, //: Letter.N,
  7.507, //: Letter.O,
  1.929, //: Letter.P,
  0.095, //: Letter.Q,
  5.987, //: Letter.R,
  6.327, //: Letter.S,
  9.056, //: Letter.T,
  2.758, //: Letter.U,
  0.978, //: Letter.V,
  2.361, //: Letter.W,
  0.150, //: Letter.X,
  1.974, //: Letter.Y,
  0.074, //: Letter.Z
];

function CumulativeFrequencies(frequencies: number[]) : number[] {
  let accumulator = 0;
  let result = [];
  for (let i = 0; i < frequencies.length; i++) {
    accumulator += frequencies[i];
    result.push(accumulator);
  }
  return result;
}

const cumulativeFrequencies = CumulativeFrequencies(frequencies);

// Stochastic sampling
export function Sample(percent: number): Letter {
  if (percent <= 0) { return Letter.A; }
  if (percent >= 100) { return Letter.Z; }
  return (cumulativeFrequencies.findIndex(f => f >= percent)) as Letter;
}

export function Shuffle(seed: number): Letter[] {
  const deck = [...Array(52).keys()];
  for (let i = 0; i < deck.length; ++i) {
    deck[i] = Sample(Math.random() * 100);
  }
  return deck;
}

export interface Layout {
  columns: Letter[][];
  discard: Letter[];
}

export function Deal(input_deck: Letter[]): Layout {
  let deck = [...input_deck]; // copy deck for splicing
  let columns = [];
  columns.push(deck.splice(0, 7));
  columns.push(deck.splice(0, 6));
  columns.push(deck.splice(0, 5));
  columns.push(deck.splice(0, 4));
  columns.push(deck.splice(0, 3));
  columns.push(deck.splice(0, 2));
  columns.push(deck.splice(0, 1));
  return {columns, discard: deck};
}