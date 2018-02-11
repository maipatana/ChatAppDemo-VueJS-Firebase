<template>
    <v-container>
        <v-layout col justify-center>
            <v-flex xs12 sm8 md6>
                <hr>
                <h1><center>{{ chatName }}</center></h1>
                <hr>
            </v-flex>
        </v-layout>
        <v-layout col justify-center>
            <v-flex xs12 sm8 md6 class="messageBox" ref="messageBox">
                <div v-for="message in messages" :key="message.time">
                    <div :style="message.uid === user.uid ? 'text-align: right;' : 'text-aling: left;'">
                        <p>{{ message.name }} Say:</p>
                        <p>{{ message.message }}</p>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex xs11 sm7 md5>
                <v-text-field
                label="ข้อความ"
                v-model="message"
                 @keyup.enter="sendMessage"></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-btn style="float: right;" @click="sendMessage">
                    <v-icon>send</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            message: ''
        }
    },
    computed: {
        messages () {
            return this.$store.getters.messages
        },
        chatName () {
            return this.$store.getters.chatName
        },
        user () {
            return this.$store.getters.user
        }
    },
    methods: {
        autoScroll () {
            var elem = this.$refs.messageBox
            elem.scrollTop = elem.scrollHeight;
        },
        sendMessage () {
            if (this.message !== '') {
                this.$store.dispatch('addMessage', this.message)
                this.message = ''
            }
        }
    },
    mounted () {
        this.autoScroll()
    },
    updated () {
        this.autoScroll()
    }
}
</script>

<style scoped>
.messageBox {
    box-shadow: inset 1px 1px 5px gray;
    padding:10px;
    max-height: 450px;
    min-height: 50vh;
    overflow: scroll;
}
</style>
