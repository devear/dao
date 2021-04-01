<template>
    <div>
        <Sidebar/>
        <v-main>
            <router-view/>
        </v-main>
    </div>
</template>
<script>
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'

export default {
    name: 'main-layout',
    async mounted(){
        if(!Object.keys(this.$store.getters.info).length){
           await this.$store.dispatch('fetchInfo')
        }
    },
    components: {
        Sidebar
    },
    computed: {
        error(){
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError){
            this.$error(messages[fbError.code] || 'Что-то пошло не так')
        }
    }
}
</script>