<template>
  <modal name="inputName" :width="250" :height="100">
    <div class="modal-mask">
      <div slot="bottom-right">
        <button class="ok" @click="closed()">✔️</button>
      </div>
      <input class="inputName" type="text" id="contactName" placeholder="Your name">
    </div>
  </modal>
</template>

<script>
export default {
  name: "inputName",
  data() {
    return {
      nameUser: ""
    };
  },
  methods: {
    opened() {
      this.$modal.show("inputName");
    },
    closed() {
      this.$modal.hide("inputName");
      this.$emit("nameUser", {
        nameUser: this.nameUser
      });
    }
  },
  mounted() {
    this.opened();
  }
};
</script>

<style scoped>
.inputName {
  color: #000;
  font-size: 16px;
  font-family: "Press Start 2P", sans-serif;
  background: transparent;
  border: none;
  width: 200px;
}
.inputName::placeholder {
  color: #000;
}
</style>
