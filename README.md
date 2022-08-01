# scvmgrinder

A browser based character sheet using svelte and localstorage.

Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.

[MÖRK BORG](https://morkborg.com/) is copyright Ockult Örtmästare Games and Stockholm Kartell.

## Attack Action

1. Click tohit button in WeaponsCarried
2. Set attack in Attack store
3. Click item in combat tracker
4. Set Target in Attack store
5. emit attack message

I still don't like this because I think I need to handle damage differently... so would I have a damage store?

So there is an idea of an effect queue.

body.click -> isAttack -> body.click -> isTarget

### Thinking it through

Possibly there are two main types of player interaction; Checks and Effects. Checks are just a role against some number that is reported in a message. An effect changes the state of the effected player or monster.

So attack would become a check and damage en effect and it all needs to be passed as data rather than a function

```
const Damage: Status = {
  type:'damage',
  duration:'immediate',
  amount: 5
}
```

Then this would need to be handled by an effect "queue" that would know how to roll armor, do resistance and message back.

## Attack Action Again

1. Set Attack executes a function that pushes attack data to Stores/Attack
2. Set Target executes a function that pushes target data to Stores/Attack
3. Stores/Attack resolves and emits a message

Attacks as OOP

```
const someStateVar = noop;

onAttackButtonClick() => someStateVar = attack(attacker)
someStateVar(target)

function async execute () {
  await :rollsDice

  dispatch(attackmessage)

  hit?
    await :rollsDice
    dispatch(damagemessage)
    target.doDamage(x)

  someStateVar = noop;
}

function attack (attacker) {
  getstuff
  return function target(targetData) {
    execute(attackerData, targetData)
  }
}
```

Attacks as OOP Chain

```
const attack (player) => (target) => {}
const defense (monster) {}
```

## Damage

1. Do Damage executes a function that pushes damage data
2. Set Target ...
3. Stores/Attack resolves damage, emits a message and does damage

### Equipment SideTrek

If I had an equipment object and I pressed delete what parts of the program would need to know?

Update State;
Re-RenderUI;
SyncWith Server;

Character.equipment.delete(\_eqid);
.data(id) {
this.equipment.filter(id !== \_eqid)
notify(this.equipment); // updates state...
}

## PROCESS

1. Press attack button (for a weapon belonging to player or monster)
2. Check Tips
3. Emit Tip
4. Add Attack Data to some sort of resolver
5. Update UI to show valid targeting
6. Press target (UI)
7. Add target data to resolver
8. Resolver rolls dice
9. Crit Add Crit Status to Attacker, Reduce Armor of Defender
10. Fumble: Break Attacker Weapon
11. Emit Attack Message (success/failure)
12. Roll Damage Dice
13. Roll Armor Dice
14. Emit Damage Message
15. Reduce Defender HP
16. Apply Effect (if any) to defender

This process is good but the app isn't "ready" for it, maybe. There needs to be a meaningful way to identify attackers, targets, access their data and update them.

### Attacker Needs

Break Weapon
Get Dice Mods

### Defender Needs

Reduce Armor Tier
Take Damage
