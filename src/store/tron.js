import firebase from 'firebase/app'
import TronWeb from 'tronweb'
export default {
    state: {

    },
    mutations: {

    },
    actions: {
        async fetchCurrency({ dispatch }) {
            const decimals = 1000000
            const fullNode = "https://api.shasta.trongrid.io"
            const solidityNode = "https://api.shasta.trongrid.io"
            const eventServer = "https://api.shasta.trongrid.io"

            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                if (info) {
                    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, info.pk)
                    const token = await tronWeb.contract().at("TYjsaL4BisZ3VMKGMti4ySvhBUYAyC14Tc")
                    const balance = await token.balanceOf(info.address).call() / decimals
                    const balanceTRX = await tronWeb.trx.getBalance(info.address) / 1000000

                    return { info, balanceTRX, balance }
                } else {
                    return null
                }
            } catch (e) {
                console.log(e)
            }
        },
        async contractData({ dispatch }) {
            //const decimals = 1000000
            const fullNode = "https://api.shasta.trongrid.io"
            const solidityNode = "https://api.shasta.trongrid.io"
            const eventServer = "https://api.shasta.trongrid.io"

            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                if (info) {
                    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, info.pk)
                    const contract = await tronWeb.contract().at("TT8e5gYVwdcZQZfgMB76ZXviab91Yv1u7b")
                    const funds = await contract.getFunds().call()
                    const networkUnilevel = await contract.getNetworkUnilevel().call()

                    funds.f1a = tronWeb.address.fromHex(funds.f1a)
                    funds.f2a = tronWeb.address.fromHex(funds.f2a)
                    funds.f3a = tronWeb.address.fromHex(funds.f3a)
                    funds.f4a = tronWeb.address.fromHex(funds.f4a)

                    networkUnilevel.lev1 = tronWeb.address.fromHex(networkUnilevel.lev1) == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb' ? null : tronWeb.address.fromHex(networkUnilevel.lev1)
                    networkUnilevel.lev2 = tronWeb.address.fromHex(networkUnilevel.lev2) == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb' ? null : tronWeb.address.fromHex(networkUnilevel.lev2)
                    networkUnilevel.lev3 = tronWeb.address.fromHex(networkUnilevel.lev3) == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb' ? null : tronWeb.address.fromHex(networkUnilevel.lev3)

                    return { funds, networkUnilevel }
                } else {
                    return null
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {

    }
}