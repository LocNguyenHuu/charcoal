<template>
    <div class="sign-up-form">
        <h1 class="title is-1">
            Sign Up
        </h1>
        <ch-box>
            <ch-form
                :payload="user"
                :url="resource"
            >
                <ch-input
                    label="First Name"
                    placeholder="Enter your first name"
                    v-model="user.firstName"
                >
                </ch-input>
                <ch-input
                    label="Last Name"
                    placeholder="Enter your last name"
                    v-model="user.lastName"
                >
                </ch-input>
                <ch-input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    v-model="user.email"
                >
                </ch-input>
                <ch-input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    v-model="user.password"
                >
                </ch-input>
                <ch-input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    v-model="user.confirmPassword"
                >
                </ch-input>
                <ch-button
                    class="is-danger"
                    type="submit"
                >
                </ch-button>
            </ch-form>
        </ch-box>
    </div>
</template>

<script>
import ChBox from '../elements/Box.vue'
import ChButton from '../elements/Button.vue'
import ChForm from './Form.vue'
import ChInput from './Input.vue'

export default {
    components: {
        ChBox,
        ChButton,
        ChForm,
        ChInput
    },
    data() {
        return {
            resource: 'http://www.your-url.com/',
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    }
}
</script>

<style lang="scss">
.sign-up-form {
    margin: 1em;
}

@media (min-width: 768px) {
    .sign-up-form-container {
        margin: 3em 0;
    }
}
</style>
