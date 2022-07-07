# scvmgrinder

A browser based character sheet using svelte and localstorage.

Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.

[MÖRK BORG](https://morkborg.com/) is copyright Ockult Örtmästare Games and Stockholm Kartell.

## Attack Action

1. Click tohit button in WeaponsCarried
2. Set attack in Attack store
3. Click item in combat tracker
4. Set Tarhet in Attack store
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
