import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import CardHeader from './CardHeader'
import { NavigationActions } from 'react-navigation'

function StartQuizButton ({ onPress }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.startQuizSubmitBtn}
			onPress={onPress}
		>
			<Text style={styles.startQuizButtonText}>
				Start Quiz
			</Text>
		</TouchableOpacity>
	)
}

function AddCardButton ({ onPress }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.addCardSubmitBtn}
			onPress={onPress}
		>
			<Text style={styles.addCardButtonText}>
				Add Card
			</Text>
		</TouchableOpacity>
	)
}

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {
    	return {
    		title: navigation.state.params.title,
    	}
  	}

  	addCard = () => {
  		this.props.navigation.dispatch(NavigationActions.navigate({
  			routeName: 'AddCard',
  			params: {
  				deck: this.props.deck
  			}
  		}))
  	}

  	startQuiz = () => {
  		this.props.navigation.dispatch(NavigationActions.navigate({
  			routeName: 'Quiz',
  			params: {
  				deck: this.props.deck
  			}
  		}))
  	}

	render () {
		return (
			<View>
				<CardHeader item={this.props.deck} />
				<AddCardButton onPress={this.addCard} />
				<StartQuizButton onPress={this.startQuiz}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	iosSubmitBtn: {
		/* ios css */
	},
	startQuizSubmitBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 75,
		width: 150,
		marginTop: 50,
		alignSelf: 'center'
	},

	addCardSubmitBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 75,
		width: 150,
		marginTop: 120,
		alignSelf: 'center'
	},
	startQuizButtonText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center',
		paddingTop: 19,
	},
	addCardButtonText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center',
		paddingTop: 19,
	},
})

function mapStateToProps(decks, { navigation }) {
	const { title } = navigation.state.params
	return {
 		deck: decks[title],
	}
}

export default connect(mapStateToProps)(Deck)