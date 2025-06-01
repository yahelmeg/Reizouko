export interface Kanji {
  character: string;
  meaning: string;
  kunyomi?: string;
  onyomi?: string;
  jlptLevel: string;
}

export interface BackendKanji {
  kanji: string;
  meaning: string;
  kunyomi?: string;
  onyomi?: string;
  jlpt_level: string;
}
