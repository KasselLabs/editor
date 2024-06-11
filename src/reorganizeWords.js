import convertTimeStringToSeconds from './convertTimeStringToSeconds';

const WORD_END_CHARACTERS = new Set(['?', '.', '!']);

const reorganizeWords = (segments, {
  maxWordsPerLine,
  maxSecondsPerLine,
  maxCharactersPerLine,
  cutPhrases,
  removePunctuation,
}) => {
  const reorganizedSegments = [];

  let currentSegment = {
    startTime: null,
    endTime: null,
    words: [],
  };

  const words = segments.map((l) => l.words).flat();

  let currentCharCount = 0;
  words.forEach((word, index) => {
    const wordEnd = convertTimeStringToSeconds(word.endTime);
    const wordString = word.word.trim();
    const wordCharCount = wordString.length;

    if (currentSegment.startTime === null) {
      currentSegment.startTime = word.startTime;
      currentSegment.endTime = word.endTime;
      currentSegment.words.push({
        ...word,
        word: removePunctuation ? word.word.trim().replace(/[.?!,]/g, '') : word.word,
      });
      currentCharCount += wordCharCount;
      return; // continue
    }
    const segmentStart = convertTimeStringToSeconds(currentSegment.startTime);

    const lastWordString = words[index - 1]?.word?.trim() || '';
    const isWordEnding = WORD_END_CHARACTERS.has(lastWordString.slice(-1));

    if (
      // Duração da legenda ultrapassará o tempo máximo
      (wordEnd - segmentStart) >= maxSecondsPerLine
      // Contagem de palavra ultrapassará o maximo
      || currentSegment.words.length >= maxWordsPerLine
      // Contagem de caracteres ultrapassará o maximo
      || currentCharCount >= maxCharactersPerLine
      // é o final de uma frase
      || (!cutPhrases && isWordEnding)
    ) {
      reorganizedSegments.push(currentSegment);
      currentSegment = {
        startTime: word.startTime,
        endTime: null,
        words: [],
      };
      currentCharCount = 0;
    }

    currentSegment.endTime = word.endTime;
    currentSegment.words.push({
      ...word,
      word: removePunctuation ? word.word.trim().replace(/[.?!,]/g, '') : word.word,
    });
    currentCharCount += wordCharCount;

    const isLastWord = index === (words.length - 1);
    if (isLastWord) {
      reorganizedSegments.push(currentSegment);
    }
  });

  return reorganizedSegments.map((segment, index) => ({
    id: index,
    ...segment,
    text: segment.words.map((w) => w.word.trim()).join(' '),
  }));
};

export default reorganizeWords;
