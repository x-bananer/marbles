export const state = () => ({
    user: {},
    newUsersList: [], 
})

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    clearUser(state) {
        state.user = {};
    },
    SOCKET_newUser(state, data) {
        state.newUsersList.push(data);
    }
}
