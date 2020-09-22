<template>
    <div class="container">
        <h1>halaman login</h1>
        <div class="box-login">
            <form @submit.prevent="handleLogin">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    handleLogin () {
      this.loginUser({
        email: this.email,
        password: this.password
      })
    }

  }
}
</script>

<style scoped>
.box-login{
    width: 400px;
    margin-left: auto;
    margin-right: auto;
}
</style>
