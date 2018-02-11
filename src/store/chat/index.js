import * as firebase from 'firebase'

export default {
    state: {
        messages: null,
        currentChatID: '',
        chatName: ''
    },
    mutations: {
        setMessages (state, payload) {
            state.messages = payload
        },
        addMessage (state, payload) {
            state.messages.push(payload)
        },
        setChatID (state, payload) {
            state.currentChatID = payload
        },
        setChatName (state, payload) {
            state.chatName = payload
        }
    },
    actions: {
        fetchMessages ({ commit, getters }, payload) {
            firebase.database().ref('chats/' + getters.currentChatID).on('value', (snapshot) => {
                let messages = []
                if (snapshot.val()) {
                    Object.keys(snapshot.val()).forEach((key) => {
                        messages.push(snapshot.val()[key])
                    })
                }
                commit('setMessages', messages)
            })
        },
        addMessage ({ commit, getters }, payload) {
            const newMessage = {
                message: payload,
                uid: getters.user.uid,
                name: getters.user.name,
                time: new Date().toString()
            }
            firebase.database().ref('chats').child(getters.currentChatID).push(newMessage)
            .then(() => {
                //commit('addMessage', newMessage)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    getters: {
        messages (state) {
            return state.messages
        },
        currentChatID (state) {
            return state.currentChatID
        },
        chatName (state) {
            return state.chatName
        }
    }
}