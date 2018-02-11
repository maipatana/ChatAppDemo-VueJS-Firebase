import * as firebase from 'firebase'

export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        signInWithGoogle () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).catch(function(error) {
                // Handle Errors here.
                console.log(error)
              });
        },
        signOut ({ commit }) {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                commit('setUser', null)
              }).catch(function(error) {
                // An error happened.
              });
        },
        autoSignin ({ commit, getters }, payload) {
            const newUser = {
                name: payload.displayName,
                email: payload.email,
                photoURL: payload.photoURL,
                uid: payload.uid
            }
            firebase.database().ref('users/' + newUser.uid + '/userData/').update(newUser)
            firebase.database().ref('users/' + newUser.uid).update({messageToken: payload.messageToken})
            commit('setUser', newUser)
        }
    },
    getters: {
        user (state) {
            return state.user
        }
    }
}