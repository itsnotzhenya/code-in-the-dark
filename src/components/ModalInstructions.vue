<template>
  <div class="modal">
    <modal :clickToClose="false" name="instructions" :width="450" :height="210">
      <pre class="instructions">
                      --- The rules ---
    1) No previews - of either results or assets!
    2) Stay in this editor at all times
    3) No measurement tools
    4) Stop coding when the time's up
    5) After the round is over, press "Finish" and follow the 
    prompt instructions to see your results

    Good luck and most important of all; have fun!
      </pre>
      <button id="start" class="ok" @click="start()">
        <i class="fas fa-check"></i>
      </button>
    </modal>
  </div>
</template>

<script>
export default {
  name: "instructions",
  data() {
    return {
      showEditor: true,
      timerStart: true
    };
  },
  methods: {
    opened() {
      this.$modal.show("instructions");
    },
    closed() {
      this.$modal.hide("instructions");
    },
    start() {
      this.closed();
      this.$emit("showeditor", this.showEditor);
      if (this.timerStart) {
        this.$emit("start");
        this.timerStart = false;
      }
    }
  },
  mounted() {
    this.opened();
  }
};
</script>

<style scoped>
.modal {
  z-index: 99999;
  position: relative;
}
.ok {
  position: absolute;
  right: 190px;
  bottom: 10px;
  font-family: "Press Start 2P", sans-serif;
  appearance: none;
  background-color: #3a9364;
  box-shadow: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  padding: 8px 35px;
}
</style>

