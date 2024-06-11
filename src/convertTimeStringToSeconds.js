const convertTimeStringToSeconds = (time) => {
  const [hh, mm, ss, ms] = time.split(/[.,:]/).map(Number);
  return (ms + ss * 1000 + mm * 60 * 1000 + hh * 60 * 60 * 1000) / 1000;
};

export default convertTimeStringToSeconds;
