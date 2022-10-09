export const getBetter =
  (hp: number, abilities: AbilityScores) =>
  ({
    hitpoints: { current, maximum },
    ...rest
  }: CharacterType): CharacterType => {
    return {
      ...rest,
      abilities,
      hitpoints: {
        current: current + hp,
        maximum: maximum + hp,
      },
    };
  };
