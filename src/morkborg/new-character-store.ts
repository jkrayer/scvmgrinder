import { writable } from 'svelte/store';

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
	presence: 5,
	strength: 0,
	toughness: 0,
	hitPoints: 1,
	name: ''
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
