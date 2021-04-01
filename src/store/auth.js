import firebase from 'firebase/app'
export default {
    actions: {
        async login({ commit }, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({ commit }) {
            await firebase.auth().signOut()
            commit('clearInfo')
        },
        async signUp({ dispatch, commit }, { email, password, name, address, pk, ref }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name,
                    address,
                    pk,
                    ref
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}