import { words } from './words_alpha';

export function getWords() : Set<string> {
  return words;
}

export function isWord(w: string) : boolean {
  return words.has(w.toLowerCase());
}

export function wordScore(w: string, growth: number = 2) : number {
  if (w.length === 0) { return 0; }
  return growth ** Math.min(w.length - 1, 14); // Longest word is 10, so let's not penalise too heavily
}
