import { words } from './words_alpha';

export function getWords() : Set<string> {
  return words;
}

export function isWord(w: string) : boolean {
  return words.has(w.toLowerCase());
}

export function wordScore(w: string, growth: number = 2) : number {
  return growth ** (w.length - 1);
}
