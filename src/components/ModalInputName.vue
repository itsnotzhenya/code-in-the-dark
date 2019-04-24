<template>
  <modal name="inputName" :width="300" :height="80">
    <div class="modal-mask">
      <div slot="bottom-right">
        <button class="ok" @click="closed()">
          <i class="fas fa-check"></i>
        </button>
      </div>
      <input
        class="inputName"
        v-model="nameUser"
        type="text"
        id="contactName"
        placeholder="Your name"
      >
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
      // console.log(this.nameUser);
      this.$emit("savename", this.nameUser);
    }
  },
  mounted() {
    // this.$emit("opened", this.opened());
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
  height: 37px;
  margin: 20px;
}
.inputName::placeholder {
  color: #000;
}
.ok {
  position: absolute;
  right: 25px;
  bottom: 25px;
  font-family: "Press Start 2P", sans-serif;
  appearance: none;
  background-color: #3a9364;
  box-shadow: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 15px;
}
</style>
