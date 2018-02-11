const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendNoti = functions.database.ref('/chats/{ChatID}/{message}')
    .onWrite((event) => {
        console.log("Sending Message")
        // Grab the current value of what was written to the Realtime Database.
        const senderID = event.data.val().uid
        const ChatID = event.params.ChatID
        const payload = {
            notification: {
                title: event.data.val().name + "Say:",
                body: event.data.val().message,
                icon: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                click_action: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            }
        }
        admin.database().ref('users/' + senderID + '/friends/').once('value')
        .then((snapshot) => {
            let friendID
            Object.keys(snapshot.val()).forEach((key) => {
                if (ChatID === snapshot.val()[key].ChatID) {
                    friendID = key
                }
            })
            return friendID
        })
        .then((friendID) => {
            return admin.database().ref('users/' + friendID).child('messageToken').once('value')
        })
        .then((registrationToken) => {
            return admin.messaging().sendToDevice(registrationToken.val(), payload)
        })
        .then((response) => {
            return console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            console.error(error)
        })
});
