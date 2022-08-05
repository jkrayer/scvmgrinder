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
  damager: Attacker;
  target: Target;
};

const AttackStore = writable<TAttackStore>({
  attacker: null,
  damager: null,
  target: null,
});

export default AttackStore;

// TODO: Refactor
let isCrit = false;

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
    damager: null,
    target: null,
  });

  AttackTip();
};

export const setDamager = (attacker: TCharacter, weapon: Weapon) => {
  const { damageDie, subType, special, name: weaponName } = weapon;
  const { name: characterName } = attacker;

  AttackStore.set({
    damager: {
      characterName,
      weaponName,
      attackModifier: 0, // getTestModifier(attacker),
      damageDie,
    },
    attacker: null,
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
  AttackStore.set({ attacker: null, target: null, damager: null });

AttackStore.subscribe((store) => {
  const { attacker, target, damager } = store;

  if (attacker !== null && target !== null) {
    // 8. Resolver rolls dice
    const rolled = roll(20);
    isCrit = rolled == 20;
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
    } else if (isFumble) {
      breakWeapon(attacker.weaponName);
    }

    clearTarget();
  } else if (damager !== null && target !== null) {
    // 9. Crit Add Crit Status to Attacker, Reduce Armor of Defender
    // if (isCrit) {
    // target.crit() haven't written any modifiers for monsters yet
    // }
    console.log(93, damager.damageDie);
    const damage: number[] = [rollString(damager.damageDie)];

    if (isCrit) {
      damage.push(rollString(`1${damager.damageDie}`));
    }

    // 13. Roll Armor Dice
    const armor: number = roll(rollTier(target.armorTier));

    // 14. Emit Damage Message
    toDamage({
      name: damager.characterName,
      roll: sum(damage) - armor,
      rollFormula: `(${damage.join(" + ")} - Armor(${armor}))`,
      target: target.targetName,
    });

    // 15. Reduce Defender HP
    // "Target".damage(x) // haven't written this
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
