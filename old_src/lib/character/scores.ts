export const getScore = (roll: number): number => {
  if (roll < 5) {
    return -3;
  } else if (roll < 7) {
    return -2;
  } else if (roll < 9) {
    return -1;
  } else if (roll < 13) {
    return 0;
  } else if (roll < 15) {
    return 1;
  } else if (roll < 17) {
    return 2;
  } else {
    return 3;
  }
};
