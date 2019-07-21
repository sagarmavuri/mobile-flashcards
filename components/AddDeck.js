import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addDeck } from '../actions'
import { saveDeck, getAllDecks } from '../utils/api'

function SubmitButton ({ onPress, title }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			onPress={onPress}
			disabled={title.trim() === ''}
		>
			<Text style={styles.submitBtnText}>
				Submit
			</Text>
		</TouchableOpacity>
	)
}

class AddDeck extends Component {

	state = {
		title: '',
		titleToNavigate: '',
	}

	handleChange = (input) => {
		/* TODO: Handle change */
		this.setState(() => ({
			title: input,
			titleToNavigate: input,
		}))
	}

	navigateToDeck = () => {
		this.props.navigation.navigate(
			'Deck',
			{title: this.state.titleToNavigate}
		)
	}

	submit = () => {
		/* TODO: Add submit functionalities */
		const { title } = this.state

		// TODO: Update redux
		this.props.dispatch(addDeck({
			[title]: {
				title,
				questions: [],
			}
		}))

		// TODO: Reset component state
		this.setState(() => ({
			title: ''
		}))

		// TODO: Navigate to Home
		this.navigateToDeck()

		// TODO: Update DB
		saveDeck(title)

		// TODO: see if notifications have to be setup as well
	}

	render () {
		return (
			<KeyboardAvoidingView
				style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}}
				behavior='padding'
			>
					<View style={styles.container}>
						<Text style={styles.title}>What is the title of your new deck?</Text>
						<TextInput
							value={this.state.title}
							onChangeText={this.handleChange}
							placeholder='Deck Title'
							style={styles.input}
							underlineColorAndroid='black'
						/>
						<SubmitButton onPress={this.submit} title={this.state.title} />
					</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	iosSubmitBtn: {
		/* TODO: add IOS functionalities */
	},
	androidSubmitBtn: {
		backgroundColor: '#00a0fc', // ext
		borderRadius: 8,
		height: 45,
		width: 100,
		//alignSelf: 'flex-end',
		//justifyContent: 'center',
		//alignItems: 'center',
		//marginLeft: 30,
		//marginRight: 30,
	},
	input: {
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 1,
		width: 200,
		height: 50,
		//alignItems: 'center',
		textAlign: 'center',
	},
	submitBtnText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center',
		paddingTop: 7,
	},
	title: {
		fontSize: 40,
		textAlign: 'center',
	}
})

export default connect()(AddDeck)