<template>
  <div class="login-wrapper border border-light">
       
    <!-- <p v-html='authFailed()'></p> -->
   <!-- {{error.response.status}} -->
      <!-- <h5 v-if="user_email !=''">Logged in as: {{user_email}}</h5>
      <h5 v-else v-bind:style="{ color: 'red'}">{{authFailed()}}</h5> -->

    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Please sign in</h2>
      <p v-if="user_email != ''">Logged in as: {{user_email}}</p>
      <p v-else-if="error"><span v-html="error.response.data.message"></span></p>
      <!-- <p v-else ><span v-html='error.response.data.message || errorMessage'></span></p> -->
      <label for="inputEmail" class="sr-only">Username</label>
      <input v-model="username" type="name" id="inputEmail" class="form-control" placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import utils from '../mixins/utils';
import ajax from '../mixins/ajax';
import {AUTH_REQUEST} from '../store/actions/auth'

export default {
    mixins: [utils, ajax],
    name: 'Login',
    data () {
    return {
        message: '',
        errorMessage: '',
        data: '',
        code: '',
        username: '',
        password: '',
        user_email: '',
        error: '',
        status: '',
        token: ''
    }
},

methods: {
 login: function () {
   const { username, password } = this
   this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
     this.$router.push('/City')
   })
 }
}

}
</script>

<style lang="scss">

</style>
