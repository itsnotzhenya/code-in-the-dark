<template>
  <div class="modal">
    <modal :clickToClose="false" name="instructions" :width="450" :height="300">
      <div id="container">
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
    <p class="ref">{{asset}}</p>

        <button id="start" class="ok" @click="start()">
          <i class="fas fa-check"></i>
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { db } from "@/firebase";
let taskRef = db.ref("task");

export default {
  firebase: { task: taskRef },
  name: "instructions",
  data() {
    return {
      assets: "",
      asset: "",
      showEditor: true,
      timerStart: true,
      firebase: {
        taskArr: db.ref("task")
      }
    };
  },
  mounted() {
    this.opened();
  },
  methods: {
    async getRef() {
      const snapshot = await taskRef.once('value')
        snapshot.forEach((childSnapshot) => {
          this.asset = childSnapshot.val().reference;
        });
    },
    opened() {
      this.$modal.show("instructions");
      this.getRef()

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
  }
};
</script>

<style scoped>
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
.ref {
  margin-left: 15px;
  width: 420px;
}
</style>

