import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CardHeader (props) {
	return (
		<View style={styles.deck}>
			<Text style={[styles.deckTitle, {'color':'black'}]}>
				{props.item.title}
			</Text>
			<Text style={styles.cardsText}>
				{props.item.questions.length} card(s)
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	deck: {
		height: 90,
		borderRadius: 3,
		shadowColor: "#00a0fc",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		marginTop: 10,
		marginBottom: 10,
	},
	deckTitle: {
		textAlign: 'center',
		marginTop: 25,
		fontSize: 28,
	},
	cardsText: {
		textAlign: 'center',
		color: 'gray'
	}
})