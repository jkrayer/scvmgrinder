import { writable } from "svelte/store";
import { sum } from "ramda";
import type { TCharacter, TrackerMonster, Weapon } from "../global";
import { Attack as AttackTip } from "../Tips";
import { roll, rollString } from "../lib";
import { toHit, toDamage } from "../api/MessageService";
import { breakWeapon } from "../stores/Character";
import { getToHit, rollTier } from "./lib";

type Attacker = {
  characterName: string;
  weaponName: string;
  attackModifier: number;
  damageDie: string;
};

type Target = {
  targetName: string;
  attackDC: number;
  armorTier: number;
};

type TAttackStore = {
  attacker: Attacker;
  target: Target;
};

const AttackStore = writable<TAttackStore>({
  attacker: null,
  target: null,
});

export default AttackStore;

export const setAttacker = (attacker: TCharacter, weapon: Weapon) => {
  const { damageDie, subType, special, name: weaponName } = weapon;
  const { name: characterName } = attacker;

  AttackStore.set({
    attacker: {
      characterName,
      weaponName,
      attackModifier: 0, // getTestModifier(attacker),
      damageDie,
    },
    target: null,
  });

  AttackTip();
};

// attackDC: 12,

export const setTarget = (target: TrackerMonster) => {
  AttackStore.update((data: TAttackStore) => ({
    ...data,
    target: {
      targetName: target.name,
      attackDC: getToHit(target),
      armorTier: target.armor.tier.current,
    },
  }));
};

export const clearTarget = () =>
  AttackStore.set({ attacker: null, target: null });

AttackStore.subscribe((store) => {
  const { attacker, target } = store;

  if (attacker !== null && target !== null) {
    // 8. Resolver rolls dice
    const rolled = 20; // roll(20);
    const isCrit = rolled == 20;
    // @ts-ignore
    const isFumble = rolled == 1;
    const isHit = rolled + attacker.attackModifier >= target.attackDC;

    // 11. Emit Attack Message (success/failure)
    toHit({
      name: attacker.characterName,
      roll: rolled + attacker.attackModifier,
      rollFormula: `${rolled} + ${attacker.attackModifier}`,
      target: target.targetName,
      dc: target.attackDC,
    });

    if (isHit) {
      // 9. Crit Add Crit Status to Attacker, Reduce Armor of Defender
      // if (isCrit) {
      // target.crit() haven't written any modifiers for monsters yet
      // }
      console.log(93, attacker.damageDie);
      const damage: number[] = [rollString(attacker.damageDie)];

      if (isCrit) {
        damage.push(rollString(attacker.damageDie));
      }

      // 13. Roll Armor Dice
      const armor: number = roll(rollTier(target.armorTier));

      // 14. Emit Damage Message
      toDamage({
        name: attacker.characterName,
        roll: sum(damage) - armor,
        rollFormula: `(${damage.join(" + ")} - Armor(${armor}))`,
        target: target.targetName,
      });

      // 15. Reduce Defender HP
      // "Target".damage(x) // haven't written this
    } else if (isFumble) {
      breakWeapon(attacker.weaponName);
    }

    clearTarget();
  }
});

// NOTES:
// class Mediator {}

// class Attack extends Mediator {
//   attacker = null;
//   defender = null;

//   setAttacker(attacker) {
//     this.attacker = attacker;
//     return this;
//   }

//   setDefender(defender) {
//     if (this.attacker !== null) {
//       this.defender = defender;
//     }
//     return this;
//   }

//   mediate() {}
// }
