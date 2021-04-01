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
            lg="6"
            xl="6"
            md="8"
            >
                <v-card class="elevation-12">
                    <form class="card auth-card" @submit.prevent="submitHandler">
                        <div class="card-content">
                            <span class="card-title">Регистрация</span>
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
                            <div class="input-field">
                            <input
                                id="name"
                                type="text"
                                v-model.trim="name"
                                :class="{invalid: $v.name.$dirty && !$v.name.required}"
                            >
                            <label for="name">Имя</label>
                            <small class="helper-text invalid"
                            v-if="$v.name.$dirty && !$v.name.required"
                            >Введите ваше Имя</small>
                            </div>
                            <div class="input-field">
                            <input
                                id="address"
                                type="text"
                                v-model.trim="address"
                                :class="{invalid: $v.address.$dirty && !$v.address.required}"
                            >
                            <label for="address">Адрес</label>
                            <small class="helper-text invalid"
                            v-if="$v.address.$dirty && !$v.address.required"
                            >Введите адрес кошелька (TRX)</small>
                            </div>
                            <div class="input-field">
                            <input
                                id="pk"
                                type="text"
                                v-model.trim="pk"
                                :class="{invalid: $v.pk.$dirty && !$v.pk.required}"
                            >
                            <label for="pk">Приватный ключ</label>
                            <small class="helper-text invalid"
                            v-if="$v.pk.$dirty && !$v.pk.required"
                            >Введите приватный ключ (TRX)</small>
                            </div>
                            <div class="input-field">
                            <input
                                id="ref"
                                type="text"
                                v-model.trim="ref"
                                :class="{invalid: $v.ref.$dirty && !$v.ref.required}"
                            >
                            <label for="ref">Реферальный код</label>
                            <small class="helper-text invalid"
                            v-if="$v.ref.$dirty && !$v.ref.required"
                            >Введите реферальный код</small>
                            </div>
                            <p>
                            <label>
                                <input type="checkbox" v-model="agree" />
                                <span>С правилами согласен</span>
                            </label>
                            </p>
                        </div>
                        <div class="card-action">
                            <div class="center">
                            <button
                                class="btn waves-effect waves-light auth-submit"
                                type="submit"
                            >
                                Зарегистрироваться
                            </button>
                            </div>
                            <br>
                            <p class="center">
                            Уже есть аккаунт?
                            <router-link to="/login">Войти</router-link>
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

export default {
    name: 'Signup',
     data: () => ({
        email: '',
        password: '',
        name: '',
        address: '',
        pk: '',
        ref: '',
        agree: false
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(8)},
        name: {required},
        address: {required},
        pk: {required},
        ref: {required},
        agree: {cheked: v => v}
    },
    methods: {
        async submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name,
                address: this.address,
                pk: this.pk,
                ref: this.ref
            }
            
            try{
                await this.$store.dispatch('signUp', formData)
                this.$router.push('/')
            }catch(e){
                console.log(e)
            }
        }
    }
}
</script>