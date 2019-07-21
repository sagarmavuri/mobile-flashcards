import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Platform,
	KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'
import { saveCard } from '../utils/api'

function SubmitButton ({ onPress, question, answer }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			onPress={onPress}
			disabled={question.trim() === '' || answer.trim() === ''}
		>
			<Text style={styles.submitBtnText}>
				Submit
			</Text>
		</TouchableOpacity>
	)
}
class AddCard extends Component {

 	state = {
 		question: '',
 		answer: '',
 	}

 	handleChange = (event, name) => {
 		const { text } = event.nativeEvent
 		this.setState(() => ({
 			[name]: text,
 		}))
 	}

 	submitCard = () => {
 		const { question, answer } = this.state

 		const card = {
 			question,
 			answer,
 		}

 		// Update redux
 		this.props.dispatch(addCard(card, this.props.deck))

 		//Update DB
 		saveCard(this.props.deck.title, card)
 		// go back to cards page
 		this.props.navigation.dispatch(NavigationActions.back({
 			routeName: 'Deck',
 			params: {
 				title: this.props.deck.title
 			}
 		}))
 	}

 	render () {
 		const { question, answer } = this.state
 		return (
 			<KeyboardAvoidingView
				style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}}
				behavior='padding'
			>
				<View style={styles.container}>
						<TextInput
							value={question}
							onChange={(event) => this.handleChange(event, 'question')}
							placeholder='Please enter your question here'
							style={styles.input}
							underlineColorAndroid='black'
						/>
						<TextInput
							value={answer}
							onChange={(event) => this.handleChange(event, 'answer')}
							placeholder='Please enter your answer here'
							style={styles.input}
							underlineColorAndroid='black'
						/>
						<SubmitButton onPress={this.submitCard} question={question} answer={answer}/>
				</View>
			</KeyboardAvoidingView>
		)
 	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	input: {
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 1,
		width: 280,
		height: 50,
		//alignItems: 'center',
		textAlign: 'center',
	},
	androidSubmitBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 45,
		width: 100,
	},
	submitBtnText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center',
		paddingTop: 7,
	},
})

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params
	return {
		deck,
	}
}

export default connect(mapStateToProps)(AddCard)