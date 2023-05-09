import { compose, modifyPath } from 'ramda';
import { rollD10 } from '$lib/dice';
// DATA
import characters from '../../morkborg/data/characters';
import tableOne from '../../morkborg/data/tables/one';
import eqTableTwo from '../../morkborg/data/tables/two';
import eqTableThree from '../../morkborg/data/tables/three';
import weaponTable from '../../morkborg/data/tables/weapons';
import armorTable from '../../morkborg/data/tables/armor';
import terribelTraits from '../../morkborg/data/tables/terrible-traits';
import brokenBodies from '../../morkborg/data/tables/broken-bodies';
import badHabits from '../../morkborg/data/tables/bad-habits';
import scrolls_sacred from '../../morkborg/data/scrolls_sacred';
import scrolls_unclean from '../../morkborg/data/scrolls_unclean';

const scrollAtIndex =
	(scrolls: Equipment.Scroll[]) =>
	(index: number): Equipment.Scroll =>
		scrolls[index];

const stringify = (x: any): string => JSON.stringify({ equipment: x });
// (x) => (fn) => [fn(x), x]
const nameAndScroll = (x: Equipment.Scroll): [string, Equipment.Scroll] => [x.name, x];
const scrollString = ([name, scroll]: [string, Equipment.Scroll]): [string, string] => [
	name,
	stringify(scroll)
];

const getSacredScroll = compose<
	[number],
	Equipment.Scroll,
	[string, Equipment.Scroll],
	[string, string]
>(scrollString, nameAndScroll, scrollAtIndex(scrolls_sacred));

const getnUncleanScroll = compose<
	[number],
	Equipment.Scroll,
	[string, Equipment.Scroll],
	[string, string]
>(scrollString, nameAndScroll, scrollAtIndex(scrolls_unclean));

export function load(): CreateCharacterData {
	const [sacredName, sacredScroll]: [string, string] = getSacredScroll(rollD10() - 1);
	const [uncleanName, uncleanScroll]: [string, string] = getnUncleanScroll(rollD10() - 1);

	// TODO: Insert Values
	const tableTwo: Table = modifyPath(
		['rows', 4],
		(s: Equipment.Scroll) => ({
			...s,
			value: uncleanScroll,
			label: `${uncleanName} (unclean scroll)`
		}),
		{ ...eqTableTwo }
	);

	const tableThree: Table = modifyPath(
		['rows', 1],
		(s: Equipment.Scroll) => ({
			...s,
			value: sacredScroll,
			label: `${sacredName} (sacred scroll)`
		}),
		{ ...eqTableThree }
	);

	return {
		tables: {
			characters,
			tableOne,
			tableTwo,
			tableThree,
			weaponTable,
			armorTable,
			terribelTraits,
			brokenBodies,
			badHabits
		}
	};
}
