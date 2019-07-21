import { ADD_DECK, RECEIVE_DECKS, ADD_CARD } from '../actions'

export default function decks ( state = {}, action ) {
	switch (action.type) {
		case ADD_DECK:
			return {
				...state,
				...action.deck,
			}
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks,
			}
		case ADD_CARD:
			return {
				...state,
				[action.deck.title]: {
					...state[action.deck.title],
					questions: state[action.deck.title].questions.concat([action.card])
				}
			}
		default:
			return state
	}
}