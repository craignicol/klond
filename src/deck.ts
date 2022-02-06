enum Letter {
    A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
}

export function Shuffle(seed: number): Letter[] {
  const deck = [...Array(52).keys()].map(i => (i % 26) as Letter);
  return deck;
}