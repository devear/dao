<template>
    <v-container
    class="fill-height"
    fluid
    >
        <v-row
        align="center"
        justify="center"
        >
            <v-col
            cols="12"
            sm="8"
            lg="4"
            xl="4"
            md="6"
            >
                <v-card class="elevation-12">
                    <form class="card auth-card" @submit.prevent="submitHandler">
                        <div class="card-content">
                            <span class="card-title">Авторизация</span>
                            <div class="input-field">
                                <input
                                    id="email"
                                    type="text"
                                    v-model.trim="email"
                                    :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                                >
                                <label for="email">Email</label>
                                <small class="helper-text invalid"
                                v-if="$v.email.$dirty && !$v.email.required"
                                >Поле email не должно быть пустым</small>
                                <small class="helper-text invalid"
                                v-else-if="$v.email.$dirty && !$v.email.email"
                                >Введите корректный email</small>
                            </div>
                            <div class="input-field">
                            <input
                                id="password"
                                type="password"
                                v-model.trim="password"
                                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                            >
                            <label for="password">Пароль</label>
                            <small class="helper-text invalid"
                            v-if="$v.password.$dirty && !$v.password.required"
                            >Введите пароль</small>
                            <small class="helper-text invalid"
                            v-else-if="$v.password.$dirty && !$v.password.minLength"
                            >Пароль должен быть {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>
                            </div>
                        </div>
                        <div class="card-action">
                            <div class="center">
                            <button
                                class="btn waves-effect waves-light auth-submit"
                                type="submit"
                            >
                                Войти
                            </button>
                            </div>
                            <br>
                            <p class="center">
                            Нет аккаунта?
                            <router-link to="/signup">Зарегистрироваться</router-link>
                            </p>
                        </div>
                    </form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
    name: 'login',
    data: () => ({
        email: '',
        password: ''
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(8)}
    },
    mounted(){
        if(messages[this.$route.query.message]){
            this.$message(messages[this.$route.query.message])
        }
    },
    methods: {
        async submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password
            }
            try{
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            }catch(e){
                
            }
        }
    }
}
</script>