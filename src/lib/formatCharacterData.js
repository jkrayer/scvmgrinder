import { map } from "ramda";
import { rollString } from "../lib";

const formatItem = (eq) => {
  const armorTiers = {
    light: { currentTier: 1, maxTier: 1 },
    medium: { currentTier: 2, maxTier: 2 },
    heavy: { currentTier: 3, maxTier: 3 },
  };

  const { type, weaponType, armorType } = eq;

  if (weaponType === "ranged") return { ...eq, usesAmmo: true };
  if (type === "armor" && armorType !== "shield")
    return { ...eq, ...armorTiers[armorType] };

  return eq;
};

const formatEquipment = map(formatItem);

export const formatCharacterData = (formData) => {
  const { food, hitpoints, omens, equipment, ...rest } = formData;

  return {
    ...rest,
    hitpoints: {
      maximum: hitpoints,
      current: hitpoints,
    },
    omens: {
      die: omens,
      maximum: omens,
      current: rollString(`1d${omens}`),
    },
    powers: rollString(`1d4+${rest.abilities.presence}`),
    equipment: [
      { description: "A waterskin with # days of water", quantity: 4 },
      { description: "# day(s) worth of food", quantity: food },
      ...formatEquipment(equipment),
    ],
  };
};
