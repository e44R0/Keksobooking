export const getRandInt = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN
  }
  const minCeiled = Math.ceil(Math.min(min,max));
  const maxFloored = Math.floor(Math.max(min,max));
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const getRandFloat = (min, max, accuracy = 1) => {
  if (min < 0 || max < 0 || accuracy < 0 ) {
    return NaN
  }
  const lower = Math.min(min,max);
  const upper = Math.max(min,max);
  return (Math.random() * (upper - lower) + lower).toFixed(accuracy)
}

export const getRandomArrayElement = (array) => array[getRandInt(0, array.length - 1)];
