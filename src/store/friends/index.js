import * as firebase from 'firebase'

export default {
    state: {
        friends: []
    },
    mutations: {
        setFriends (state, payload) {
            state.friends = payload
        }
    },
    actions: {
        addFriend ({ commit, getters }, payload) {
            let friendToAdd
            firebase.database().ref('users').once('value')
            .then((users) => {
                Object.keys(users.val()).forEach((key) => {
                    if (users.val()[key].userData.email === payload) {
                        friendToAdd = users.val()[key]
                    }
                })
            })
            .then(() => {
                return firebase.database().ref('chats/').push().key
            })
            .then((ChatID) => {
                firebase.database()
                .ref('users/' + getters.user.uid + '/friends/' + friendToAdd.userData.uid)
                .set({ChatID: ChatID, ...friendToAdd.userData})
                return ChatID
            })
            .then((ChatID) => {
                firebase.database()
                .ref('users/' + friendToAdd.userData.uid + '/friends/' + getters.user.uid)
                .set({ChatID: ChatID, ...getters.user})
            })
            .catch((error) => {
                console.log(error)
            })
        },
        fetchFriends ({ commit, getters }) {
            firebase.database().ref('users/' + getters.user.uid + '/friends')
            .on('value', function(snapshot) {
                let friends = []
                if (snapshot.val()) {
                    Object.keys(snapshot.val()).forEach((key) => {
                        friends.push(snapshot.val()[key])
                    })
                    commit('setFriends', friends)
                }
              });
        }
    },
    getters: {
        friends (state) {
            return state.friends
        }
    }
}