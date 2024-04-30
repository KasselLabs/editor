const convertTimeStringToSeconds = require('../../src/utils/convertTimeStringToSeconds');

module.exports = function convertProjectToEditorJSON(project) {
  const convertedSegments = project.subtitle.transcription.segments.map((segment) => ({
    text: segment.text,
    start: convertTimeStringToSeconds(segment.startTime),
    end: convertTimeStringToSeconds(segment.endTime),
    words: segment.words.map((word) => ({
      word: word.word,
      start: convertTimeStringToSeconds(word.startTime),
      end: convertTimeStringToSeconds(word.endTime),
    })),
  }));
  return {
    ...project,
    subtitle: {
      transcription: {
        segments: convertedSegments,
      },
    },
  };
};
