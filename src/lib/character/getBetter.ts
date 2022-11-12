export const getBetter =
  (hp: number, abilities: AbilityScores, silver: number, eq: Equipment[]) =>
  ({
    hitpoints: { current, maximum },
    silver: currentSilver,
    equipment,
    ...rest
  }: CharacterType): CharacterType => {
    return {
      ...rest,
      abilities,
      silver: currentSilver + silver,
      hitpoints: {
        current: current + hp,
        maximum: maximum + hp,
      },
      equipment: [...equipment, ...eq],
    };
  };
