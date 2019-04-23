<template>
  <div class="modal">
    <modal name="instructions" :width="470" :height="200">
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
      <button class="ok" @click="start()">Начать ✔️</button>
    </modal>
  </div>
</template>

<script>
export default {
  name: "instructions",
  data() {
    return {};
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
    }
  },
  mounted() {
    this.opened();
  }
};
</script>

<style>
</style>

