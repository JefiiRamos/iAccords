import chordsJson from "@/data/chords.json";
import keysJson from "@/data/keys.json";
import progressionsJson from "@/data/progressions.json";
import type { Chord, ChordsData, Key, KeyOption, KeysData, Progression, ProgressionsData } from "@/types/music";

const keys = keysJson as KeysData;
const chords = chordsJson as ChordsData;
const progressions = progressionsJson as ProgressionsData;

export function getKeys(): string[] {
  return Object.keys(keys);
}

export function getKeyOptions(): KeyOption[] {
  return Object.entries(keys).map(([value, key]) => ({
    value,
    label: key.name,
  }));
}

export function getKey(key: string): Key | undefined {
  return keys[decodeURIComponent(key)];
}

export function getChord(chord: string): Chord | undefined {
  return chords[decodeURIComponent(chord)];
}

export function getProgressions(chord: string): Progression[] {
  return progressions[decodeURIComponent(chord)] ?? [];
}

export function getChordNames(): string[] {
  return Object.keys(chords);
}
