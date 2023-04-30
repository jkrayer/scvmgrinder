import { always, compose, gte, isEmpty, ifElse, lt, lte, not } from 'ramda';
import { writable, derived, type Readable } from 'svelte/store';

export type FormData = {
	food: number;
	silver: number;
	tableOne: string;
	tableTwo: string;
	tableThree: string;
	weapon: string;
	armor: string;
	agility: Score;
	presence: Score;
	strength: Score;
	toughness: Score;
	hitPoints: number;
	name: string;
	traits: string[];
	brokenBodies: string;
	badHabits: string;
	origin: string;
	classFeature: string;
};

type State = { selectedClass: RawClassData | Record<string, never>; formData: FormData };

// STATE FACTORY
const formDataFactory = (): FormData => ({
	food: 0,
	silver: 0,
	tableOne: '',
	tableTwo: '',
	tableThree: '',
	weapon: '',
	armor: '',
	agility: 0,
	presence: 0,
	strength: 0,
	toughness: 0,
	hitPoints: 0,
	name: '',
	traits: [],
	brokenBodies: '',
	badHabits: '',
	origin: '',
	classFeature: ''
});

const store = writable<State>({
	selectedClass: {},
	formData: formDataFactory()
});

export default store;

export function setSelectedClass(selectedClass: RawClassData) {
	store.update((state: State): State => {
		const { food, tableOne, tableTwo, tableThree, name } = state.formData;
		const formData = { ...formDataFactory(), food, tableOne, tableTwo, tableThree, name };

		return { selectedClass, formData };
	});
}

export function setTrait(trait: string) {
	store.update((state: State): State => {
		const { selectedClass, formData } = state;
		const [, two] = formData.traits;

		return { selectedClass, formData: { ...formData, traits: [two, trait] } };
	});
}

// VALIDATORS
const scoreRange = ifElse<[number], boolean, boolean>(lte(-3), gte(3), always(false));
const gtZero = lt(0);
const notEmpty = compose<[any], boolean, boolean>(not, isEmpty);

//
export const canSubmit = derived<Readable<State>, boolean>(
	store,
	({ formData }: State): boolean => {
		const VALIDATIONS: [keyof FormData, (arg1: any) => boolean][] = [
			['food', gtZero],
			['silver', gtZero],
			['tableOne', notEmpty],
			['tableTwo', notEmpty],
			['tableThree', notEmpty],
			['weapon', notEmpty],
			['armor', notEmpty],
			['agility', scoreRange],
			['presence', scoreRange],
			['strength', scoreRange],
			['toughness', scoreRange],
			['hitPoints', gtZero],
			['name', notEmpty],
			['traits', notEmpty],
			['brokenBodies', notEmpty],
			['badHabits', notEmpty]
		];

		return VALIDATIONS.reduce((acc, [key, fn]) => acc && fn(formData[key]), true);
	},
	false
);
