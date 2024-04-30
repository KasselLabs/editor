const convertSecondsToTimeString = (totalSecondsDecimal) => {
  const milliseconds = Math.floor(totalSecondsDecimal * 1000);
  const totalSeconds = Math.floor(totalSecondsDecimal);
  const ms = (milliseconds % 1000).toString().padStart(3, '0').padEnd(3, '0');
  const ss = (totalSeconds % 60).toString().padStart(2, '0');
  const mm = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, '0');
  const hh = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  return `${hh}:${mm}:${ss},${ms}`;
};

module.exports = convertSecondsToTimeString;
