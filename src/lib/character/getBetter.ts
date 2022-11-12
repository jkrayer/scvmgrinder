export const getBetter =
  (hp: number, abilities: AbilityScores, silver: number, eq: Equipment[]) =>
  ({
    hitpoints: { current: currentHP, maximum },
    silver: currentSilver,
    equipment,
    ...rest
  }: CharacterType): CharacterType => {
    const difference: number = hp - maximum;
    const perc = currentHP / maximum;

    // When HP are being adjusted up add the additional amount to the current
    // When HP are being adjusted down adjust current as a percentage of maximum
    const current =
      difference > -1 ? currentHP + difference : Math.floor(hp * perc);

    return {
      ...rest,
      abilities,
      silver: currentSilver + silver,
      hitpoints: {
        current,
        maximum: hp,
      },
      equipment: [...equipment, ...eq],
    };
  };
