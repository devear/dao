<template>
    <div>
        <v-overlay
        :z-index="zIndex"
        >
        </v-overlay>
        <router-view/>
    </div>
</template>
<script>
import messages from '@/utils/messages'

export default {
    data: () => ({
      zIndex: 0
    }),
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