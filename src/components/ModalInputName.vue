<template>
  <modal name="inputName" :width="500" :height="450">
    <div class="intentModal">
      <input
        class="inputName"
        type="text"
        v-model="newUser.nameUser"
        id="contactName"
        placeholder="Your name"
      >
    </div>
  </modal>
</template>

<script>
export default {
  //   name: inputName,
  data() {},
  methods: {
    opened() {
      this.$modal.show("inputName");
    },
    closed() {
      this.$modal.hide("inputName");
    },
    created() {
      this.opened();
    }
  }
};
</script>

<style scoped>
</style>
