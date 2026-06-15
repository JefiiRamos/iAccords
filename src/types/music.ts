export type Degree = {
  degree: string;
  chord: string;
};

export type Key = {
  name: string;
  degrees: Degree[];
};

export type Chord = {
  notes: string[];
  degree: string;
  function: string;
};

export type Progression = string[];

export type KeyOption = {
  value: string;
  label: string;
};

export type KeysData = Record<string, Key>;
export type ChordsData = Record<string, Chord>;
export type ProgressionsData = Record<string, Progression[]>;
