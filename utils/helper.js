import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Flashcards:Notifications'

// This required to filter out undefined and null objects coming rom AsyncStoage call
export function formatDeckResults (results) {
	return results !== null ? results : {}
}

export function formatDeck (title, card, decks) {
	return {
		...decks,
			[title]: {
				...decks[title],
				questions: decks[title].questions.concat([card])
			}
	}
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createLocalNotification () {
  return {
    title: 'Take quiz!',
    body: "Time to take your daily quiz!!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false
    }
  }
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
	    .then(JSON.parse)
	    .then((data) => {
	        if (data === null) {
	          Permissions.askAsync(Permissions.NOTIFICATIONS)
	            .then(({status}) => {
	              if (status === 'granted') {
	                Notifications.cancelAllScheduledNotificationsAsync()

	                let tomorrow = new Date()
	                tomorrow.setDate(tomorrow.getDate() + 1)
	                tomorrow.setHours(16)
	                tomorrow.setMinutes(0)
	                Notifications.scheduleLocalNotificationAsync(
	                  createLocalNotification(),
	                  {
	                    time: tomorrow,
	                    repeat: 'day'
	                  }
	                )
	                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
	              }
	            })
	        }
	    })
}