<template>
    <ch-section class="register-container">
        <ch-columns>
            <ch-column class="is-6-tablet is-offset-3-tablet is-one-third-desktop is-offset-one-third-desktop">
                <h1 class="title is-1">
                    Register
                </h1>
                <ch-box>
                    <form @submit.prevent="postNewUser">
                        <ch-input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            v-model="email"
                        >
                        </ch-input>
                        <ch-input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            v-model="password"
                        >
                        </ch-input>
                        <ch-button
                            class="is-danger"
                            type="submit"
                            text="Register"
                        >
                        </ch-button>
                    </form>
                </ch-box>
            </ch-column>
        </ch-columns>
    </ch-section>
</template>

<script>
import firebase from 'firebase'

import ChBox from '@/ch-components/elements/Box.vue'
import ChButton from '@/ch-components/elements/Button.vue'
import ChColumn from '@/ch-components/columns/Column.vue'
import ChColumns from '@/ch-components/columns/Columns.vue'
import ChInput from '@/ch-components/form/Input.vue'
import ChSection from '@/ch-components/layout/Section.vue'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    components: {
        ChColumn,
        ChColumns,
        ChSection,
        ChBox,
        ChButton,
        ChInput
    },
    methods: {
        postNewUser() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => this.$router.push('/login'))
                .catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss">
</style>
