import { words } from './words_alpha';

export function getWords() : Set<string> {
  return words;
}

export function isWord(w: string) : boolean {
  return words.has(w.toLowerCase());
}
