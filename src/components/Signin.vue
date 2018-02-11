<template>
    <v-layout col justify-center>
        <v-flex xs12 sm6 md6>
                <v-btn block @click="signInWithGoogle">
                Signin With Google
                </v-btn>
        </v-flex>
    </v-layout>
  
</template>

<script>
export default {
    methods: {
        signInWithGoogle () {
            this.$store.dispatch('signInWithGoogle')
        }
    }
}
</script>
