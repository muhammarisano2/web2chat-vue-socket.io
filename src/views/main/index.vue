<template>
    <div>
         <router-view :socket="socket"/>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Main',
  data () {
    return {
      socket: io('http://localhost:4000')
    }
  },
  methods: {
    // setupLogin () {
    //   this.socket.emit('setupLogin', { id: tcd is.id, token: this.token })
    // }
  },
  mounted () {
    // this.setupLogin()
  }
}
</script>

<style lang="scss" scoped>

</style>
