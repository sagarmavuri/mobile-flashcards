import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, Header } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from './reducers'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

import { setLocalNotification } from './utils/helper'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    }
  }
},
{
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    style: {
      height: 56,
    }
  }
})

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#00a0fc',
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#00a0fc',
      },
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#00a0fc'
      },
      title: 'Quiz'
    }
  }
}))

export default class App extends Component {

  componentDidMount () {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor='black' barStyle='light-content' />
          {/*<Tabs />*/}
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
