import { AsyncStorage } from 'react-native'
import { formatDeckResults, formatDeck } from './helper'

const UDACICARDS_KEY = 'UdaciCards:Flashcards'

export function saveDeck (title) {
	return AsyncStorage.mergeItem(UDACICARDS_KEY, JSON.stringify({
		[title]: {
			title,
			questions: [],
		}
	}))
}

export function getAllDecks () {
	return AsyncStorage.getItem(UDACICARDS_KEY)
		.then((results) => JSON.parse(results))
		.then((results) => formatDeckResults(results))
}

export function saveCard (title, card) {
	return AsyncStorage.getItem(UDACICARDS_KEY)
		.then((results) => {
			const decks = JSON.parse(results)
			const updatedDeck = formatDeck(title, card, decks)
			delete decks[title]
			AsyncStorage.mergeItem(UDACICARDS_KEY, JSON.stringify(updatedDeck))
		})
}