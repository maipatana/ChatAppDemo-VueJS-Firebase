<template>
  <v-app>
  <v-toolbar>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="selectView('friends')" v-if="user">Friends</v-btn>
      <v-btn flat @click="selectView('chat')" v-if="user">Chat</v-btn>
      <v-btn flat @click="selectView('signin')" v-if="!user">SignIn</v-btn>
      <v-btn flat @click="signOut" v-else>SignOut</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <component :is="selectedView"></component>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import friends from './components/Friends.vue'
  import chat from './components/Chat.vue'
  import signin from './components/Signin.vue'
  export default {
    data() {
      return {
        selectedView: 'signin'
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      messages () {
        return this.$store.getters.messages
      }
    },
    watch: {
      user (value) {
        if (value) {
          this.selectedView = 'friends'
        } else {
          this.selectedView = 'signin'
        }
      }
    },
    methods: {
      selectView (view) {
        if (this.user) {
          this.selectedView = view
          if (!this.messages && view === 'chat') {
            this.selectedView = 'friends'
          }
        } else {
          if (view === 'friends' || view === 'chat') {
            this.selectedView = 'signin'
          } else {
            this.selectedView = view
          }
        }
      },
      signOut () {
        this.$store.dispatch('signOut')
      }
    },
    components: {
      friends,
      signin,
      chat
    }
  }
</script>
