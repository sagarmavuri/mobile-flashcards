import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { getAllDecks } from '../utils/api'
import { receiveAllDecks } from '../actions'
import CardHeader from './CardHeader'

class Decks extends Component {

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.props.navigation.navigate(
				'Deck',
				{title: item.title}
			)}>
				<CardHeader item={item} />
			</TouchableOpacity>
		)
	}

	componentDidMount () {
		const { dispatch } = this.props

		getAllDecks()
			.then((decks) => {
				this.props.dispatch(receiveAllDecks(decks))
			})
	}

	render () {
		const { decks } = this.props
		const decksValues = Object.values(decks)
		return (
			<View style={styles.container}>
				<FlatList
					data={decksValues}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => index.toString()}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',

	}
})

function mapStateToProps (decks) {
	console.log('decks... ', decks)
	return {
		decks,
	}
}

export default connect(mapStateToProps)(Decks)