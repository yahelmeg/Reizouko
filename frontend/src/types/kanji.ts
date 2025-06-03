export interface Kanji {
  id: number;
  character: string;
  meaning: string;
  kunyomi?: string;
  onyomi?: string;
  jlptLevel: string;
  isLearned?: boolean;
}

export interface BackendKanji {
  id: number;
  kanji: string;
  meaning: string;
  kunyomi?: string;
  onyomi?: string;
  jlpt_level: string;
}
