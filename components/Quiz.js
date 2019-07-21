import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { setLocalNotification, clearLocalNotification } from '../utils/helper'

function CorrectButton ({ onPress }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.correctBtn}
			onPress={onPress}
		>
			<Text style={styles.buttonText}>
				Correct
			</Text>
		</TouchableOpacity>
	)
}

function IncorrectButton ({ onPress }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.incorrectBtn}
			onPress={onPress}
		>
			<Text style={styles.buttonText}>
				Incorrect
			</Text>
		</TouchableOpacity>
	)
}

class Quiz extends Component {

	state = {
		questionsAnswered: 0,
		correctOnes: 0,
		toggleAnswers: false,
	}

	updateAnsweredQuestionsCount = (event, answerType) => {

		if (answerType && answerType === 'correct') {
			this.setState((currState) => ({
				correctOnes: currState.correctOnes + 1,
				questionsAnswered: currState.questionsAnswered + 1,
			}))
		} else {
			this.setState((currState) => ({
				questionsAnswered: currState.questionsAnswered + 1,
			}))
		}

		// Clear notifications for today and set for tomorrow
		clearLocalNotification()
			.then(setLocalNotification())
	}

	toggle = () => {
		this.setState((currState) => ({
			toggleAnswers: !currState.toggleAnswers
		}))
	}

	restartQuiz = () => {
		this.setState(() => ({
			questionsAnswered: 0,
			incorrectOnes: 0,
			correctOnes: 0,
			toggleAnswers: false,
		}))
  		/*this.props.navigation.dispatch(NavigationActions.back({
  			routeName: 'Quiz',
  			params: {
  				deck: this.props.deck
  			}
  		}))*/
  	}

  	backToDeck = () => {
  		this.props.navigation.dispatch(NavigationActions.navigate({
  			routeName: 'Deck',
  			params: {
  				deck: this.props.deck
  			}
  		}))
  	}

	render () {
		const { deck } = this.props
		const { title, questions } = deck
		const totalQuestions =  questions.length
		const { questionsAnswered, correctOnes, toggleAnswers } = this.state

		if ( totalQuestions === 0 ) {
			return (
				<View style={styles.container}>
					<Text style={{fontSize: 35, textAlign: 'center'}}>
						Sorry! You do not seem to have any cards at the moment, please start adding cards to your deck...
					</Text>
				</View>
			)
		}

		if (questionsAnswered === totalQuestions) {
			return (
				<View style={styles.container}>
					<Text style={{fontWeight: 'bold', fontSize: 30, marginTop: -70}}>
						Your Score: {correctOnes}/{totalQuestions}
					</Text>
					<View>
						<TouchableOpacity style={styles.restartBtn} onPress={this.restartQuiz}>
							<Text style={styles.buttonText}>
								Restart Quiz
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.backBtn} onPress={this.backToDeck}>
							<Text style={styles.buttonText}>
								Back to Deck
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)
		}

		return (
			<View style={styles.container}>
				{toggleAnswers === true
					?	<Text style={styles.question}>
							{questions[questionsAnswered].answer}
						</Text>
					: 	<Text style={styles.question}>
							{questions[questionsAnswered].question}
						</Text>}
				<TouchableOpacity style={{marginTop: 10}} onPress={this.toggle}>
					{toggleAnswers === true
						?	<Text style={styles.linkToQuestion}>
								Go back to Question
							</Text>
						: 	<Text style={styles.linkToAnswer}>
								Show Answer
							</Text>}
				</TouchableOpacity>
				<Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 30}}>
					{questionsAnswered}/{totalQuestions}
				</Text>
				<CorrectButton onPress={(event) => this.updateAnsweredQuestionsCount(event, 'correct')} />
				<IncorrectButton onPress={(event) => this.updateAnsweredQuestionsCount(event, 'incorrect')} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iosSubmitBtn: {
		/* ios css */
	},
	correctBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 75,
		width: 150,
		marginTop: 70,
		alignSelf: 'center'
	},

	incorrectBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 75,
		width: 150,
		marginTop: 50,
		alignSelf: 'center'
	},
	buttonText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center',
		paddingTop: 19,
	},
	question: {
		fontSize: 35,
		textAlign: 'center',
	},
	linkToAnswer: {
		color: 'green',
		fontWeight: 'bold',
	},
	linkToQuestion: {
		color: 'red',
		fontWeight: 'bold'
	},
	restartBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 75,
		width: 150,
		marginTop: 70,
		alignSelf: 'center'
	},
	backBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 75,
		width: 150,
		marginTop: 50,
		alignSelf: 'center'
	},
})

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params
	return {
		deck,
	}
}

export default connect(mapStateToProps)(Quiz)