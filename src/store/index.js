import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import chat from './chat'
import friends from './friends'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: user,
        chat: chat,
        friends: friends
    }
})