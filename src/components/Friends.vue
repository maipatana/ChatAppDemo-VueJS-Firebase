<template>
    <v-layout row justify-center>
        <v-flex xs12 sm8 md6>
            <v-text-field
             ref="friendEmail" 
            label="Email to add"
            v-model="friendEmail"
            :rules="emailRules"
            @keyup.enter="addFriend"></v-text-field>
            <v-list two-line>
                <v-subheader>{{header}}</v-subheader>
                <template v-for="item in friends">
                    <v-list-tile avatar v-bind:key="item.name" @click="startChat(item.name, item.ChatID)">
                    <v-list-tile-avatar>
                        <img v-bind:src="item.photoURL">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{item.email}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            friendEmail: '',
            header: 'Friends',
            emailRules: [
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
        }
    },
    computed: {
        friends () {
            return this.$store.getters.friends
        }
    },
    methods: {
        startChat (name, ChatID) {
            this.$store.commit('setChatID', ChatID)
            this.$store.commit('setChatName', name)
            this.$store.dispatch('fetchMessages')
        },
        addFriend () {
            if (this.$refs.friendEmail.validate()) {
                this.$store.dispatch('addFriend', this.friendEmail)
                this.friendEmail = ''
            }
        }
    }
}
</script>
