<template>
    <ch-navbar class="is-fixed-top is-dark">
        <router-link
            class="navbar-item"
            slot="navbar-brand"
            to="/"
        >
            <font-awesome-icon icon="home" />
            Home
        </router-link>
        <router-link
            active-class="is-active"
            class="navbar-item"
            slot="navbar-end"
            to="/about"
            v-show="isAuthenticated"
        >
            <font-awesome-icon icon="book" />
            About
        </router-link>
        <router-link
            active-class="is-active"
            class="navbar-item"
            slot="navbar-end"
            to="/register"
        >
            <font-awesome-icon icon="pencil-alt" />
            Register
        </router-link>
        <router-link
            active-class="is-active"
            class="navbar-item"
            slot="navbar-end"
            to="/login"
        >
            <font-awesome-icon icon="sign-in-alt" />
            Login
        </router-link>
        <router-link
            class="navbar-item"
            slot="navbar-end"
            to="/login"
            v-show="isAuthenticated"
        >
            <font-awesome-icon icon="sign-in-alt" />
            Logout
        </router-link>
    </ch-navbar>
</template>

<script>
import ChNavbar from '@/ch-components/components/Navbar.vue'

export default {
    data() {
        return {
            isAuthenticated: false
        }
    },
    components: {
        ChNavbar
    }
}
</script>

<style lang="scss">
.navbar-brand,
.navbar-start,
.navbar-end {
    svg.svg-inline--fa {
        margin-right: 0.5em;
    }
}
</style>
