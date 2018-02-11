import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'

import { store } from './store'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  created () {
      // Initialize Firebase
      var config = {
        apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // Retrieve Firebase Messaging object.
          const messaging = firebase.messaging();
          messaging.requestPermission()
          .then(function() {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            return messaging.getToken()
          })
          .then((token) => {
            //console.log(token)
            store.dispatch('autoSignin', {messageToken: token, ...user})
            store.dispatch('fetchFriends')
            messaging.onMessage(function(payload) {
              console.log("Message received. ", payload);
              // ...
            });
          })
          .catch(function(err) {
            console.log('Unable to get permission to notify.', err);
            store.dispatch('autoSignin', user)
            store.dispatch('fetchFriends')
          });

          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
  }
})
