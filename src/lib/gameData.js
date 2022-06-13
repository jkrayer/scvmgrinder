export const setEffects = (characterData) => {
  const { tests, equipment } = characterData;

  equipment.forEach((eq) => {
    if (!!eq.effect) {
      Object.entries(eq.effect.tests).forEach(([key, val]) => {
        tests[key] = tests[key] + val;
      });
    }
  });

  return characterData;
};
