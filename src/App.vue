<template class="template">
  <div id="app">
    <div class="background"></div>
    <modal name="inputName" :width="250" :height="100">
      <div class="name-tag">
        <div slot="bottom-right">
          <button class="ok" @click="closed()">✔️</button>
        </div>
        <input
          class="inputName"
          type="text"
          v-model="newUser.nameUser"
          id="contactName"
          placeholder="Your name"
        >
      </div>
    </modal>
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
    <codemirror class="codemirror" v-model="newUser.codeUser" :options="cmOption"></codemirror>

    <div class="buttons">
      <input class="button" type="submit" value="Finish" @click="done()">
      <!-- <input
        class="button"
        type="submit"
        value="Instructions"
        @click="this.$modal.show('instructions')"
      >-->
    </div>
  </div>
</template>

<script>
// import ModalInputName from "./components/ModalInputName.vue";
// language
import "codemirror/mode/xml/xml.js";
// theme css
import "codemirror/theme/monokai.css";
// autoCloseTags
import "codemirror/addon/edit/closetag.js";
// fullscreen
import "codemirror/addon/display/fullscreen.js";
import "codemirror/addon/display/fullscreen.css";

import Firebase from "firebase";
import toastr from "toastr";
// import { constants } from "fs";
let config = {
  apiKey: "AIzaSyDWZvyI83vGieUtviHwaNeEq802ekbRjrc",
  authDomain: "code-19f91.firebaseapp.com",
  databaseURL: "https://code-19f91.firebaseio.com",
  projectId: "code-19f91",
  storageBucket: "code-19f91.appspot.com",
  messagingSenderId: "855561499950"
};

let app = Firebase.initializeApp(config);
let db = app.database();
let usersRef = db.ref("users");

export default {
  firebase: { users: usersRef },
  data() {
    return {
      errors: [],
      newUser: {
        nameUser: "",
        codeUser: ""
      },
      cmOption: {
        mode: "text/html",
        theme: "monokai",
        lineNumbers: true,
        autoCloseTags: true,
        collapseIdentical: false,
        highlightDifferences: true,
        viewportMargin: Infinity
      }
    };
  },
  mounted() {
    this.opened();
  },
  methods: {
    done() {
      usersRef.push(this.newUser);
      this.newUser.nameUser = "";
      this.newUser.codeUser = "";
      toastr.success("you have completed the task");
    },
    opened() {
      this.$modal.show("inputName");
    },
    closed() {
      // if (this.nameUser === undefined) {
      //   alert("Требуется указать имя.");
      //   return 0;
      // } else console.log(this.nameUser);
      this.$modal.hide("inputName");
      this.$modal.show("instructions");
      // e.preventDefault();
    },
    start() {
      this.$modal.hide("instructions");
      //timer start
    }
  }
};
</script>

<style>
@font-face {
  font-family: "Press Start 2P";
  src: url(assets/fonts/PressStart2P.ttf) format("truetype");
}
body {
  background: #131411;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.background {
  background-image: url("../img/logo.png");
  background-color: #000;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  height: 100vh;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: 520px 476px;
}
.CodeMirror {
  height: auto;
  z-index: 1024;
}
.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
.CodeMirror-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  z-index: 9;
}
.cm-s-monokai.CodeMirror {
  background: transparent;
}
.name-tag {
  position: absolute;
  bottom: 27px;
  left: 16px;
  padding: 10px;
}
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
.button {
  font-family: "Press Start 2P", sans-serif;
  appearance: none;
  background-color: #3a9364;
  color: white;
  padding: 8px 15px;
  margin: 0 10px;
  box-shadow: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
.buttons {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
.v--modal-box .v--modal {
  z-index: 9999;
}
.ok {
  position: absolute;
  right: 10px;
  bottom: 13px;
}
.instructions {
  margin: 10px;
}
</style>
