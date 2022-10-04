<template>
    <div>
        <h1>Игра {{ user.room }}</h1>
        <h2>Игрок 1: {{ user.name }}</h2>
        <h2 v-for="(newUser, index) in newUsersList" :key="index">Игрок {{index + 2}}: {{ newUser.name }}</h2>
        <v-btn @click="onClickLogout">Выйти</v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    layout: 'default',
    head() {
        return {
            title: `Игра ${this.user.room} – Marbles`,
        }
    },
    name: 'PagePlayground',
    middleware: ['auth-redirect'],
    computed: {
        ...mapState(['user', 'newUsersList']),
    },
    methods: {
        ...mapMutations(['clearUser']),
        onClickLogout() {
            this.clearUser();
            this.$router.push('/?message="logout"');
        }
    }
}
</script>
