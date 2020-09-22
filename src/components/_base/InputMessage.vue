<template>
    <div class="input-group mb-3">
  <input type="text" class="form-control" ref="inputMessage" v-model="textMessage" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="handleSend">Kirim pesan</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'InputMessage',
  data () {
    return {
      textMessage: ''
    }
  },
  methods: {
    handleSend () {
      this.$emit('handle-send', { msg: this.textMessage, dom: this.$refs.inputMessage })
    }
  }
}
</script>

<style scoped>

</style>
