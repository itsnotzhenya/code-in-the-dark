<template>
  <div @click.prevent="checkInput()">
    <modal :clickToClose="false" name="inputName" :width="300" :height="80">
      <div class="modal-mask">
        <input
          class="inputName"
          v-model="nameUser"
          type="text"
          id="contactName"
          placeholder="Your name"
          autocomplete="off"
        >
        <div slot="bottom-right">
          <button class="ok" @click="closed()">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </modal>
  </div>
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
      let date = new Date().getTime();
      if (this.nameUser == "") {
        this.checkInput();
        return;
      }
      this.nameUser += date;
      this.$modal.hide("inputName");
      this.$emit("savename", this.nameUser);
    },
    checkInput() {
      let input = document.getElementById("contactName");
      if (this.nameUser == "") {
        input.classList.add("require");
      } else {
        input.classList.remove("require");
      }
    }
  },
  mounted() {
    this.opened();
  }
};
</script>

<style scoped>
.v--modal-overlay {
  z-index: 999999;
}
.inputName {
  color: #000;
  font-size: 16px;
  font-family: "Press Start 2P", sans-serif;
  background: transparent;
  border: none;
  width: 200px;
  height: 37px;
  margin: 20px;
  padding-left: 5px;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}
.inputName:focus {
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}
.inputName::placeholder {
  color: #000;
}
.require {
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.4);
  border: 1px solid rgba(255, 0, 0, 0.4);
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
