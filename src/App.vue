<template class="template">
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <codemirror class="codemirror" v-model="newUser.codeUser" :options="cmOption"></codemirror>
    <div class="name-tag">
      <!-- <input
        class="inputName"
        type="text"
        v-model="newUser.nameUser"
        id="contactName"
        placeholder="Имя"
      >-->
      <input class="button" type="submit" value="Имя" @click="input()">
    </div>
    <input class="button" type="submit" value="Finish" @click="done()">
    <input class="button" type="submit" value="Instructions" @click="done()">
    <!-- <div>{{users.name}}</div> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// language
import "codemirror/mode/xml/xml.js";
// theme css
import "codemirror/theme/monokai.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
// autoCloseTags
import "codemirror/addon/edit/closetag.js";

import "codemirror/addon/display/fullscreen.js";
import "codemirror/addon/display/fullscreen.css";

import Firebase from "firebase";
import { constants } from "fs";
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
  components: {
    // HelloWorld
  },
  data() {
    return {
      newUser: {
        nameUser: "",
        codeUser: ""
      },
      cmOption: {
        mode: "text/html",
        theme: "monokai",
        lineNumbers: true,
        // styleActiveLine: true,
        autoCloseTags: true,
        collapseIdentical: false,
        highlightDifferences: true,
        viewportMargin: Infinity
        // scrollbarStyle: "null"
      }
    };
  },
  methods: {
    input: function() {
      this.nameUser = prompt("What is your name?");
      console.log(this.nameUser);
    },
    done: function() {
      // alert(this.nameUser);
      usersRef.push(this.newUser);
      this.newUser.nameUser = "";
      this.newUser.codeUser = "";
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
  background-image: url("../img/logo.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  height: 100vh;
  /* opacity: 0.5; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-size: 520px 476px;
}
.CodeMirror {
  /* border: 1px solid #eee; */
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
  bottom: 20px;
  left: 20px;
  padding: 10px;
  z-index: 1024;
  /* background: transparentize(#3a9364, 0.25); */
  background: #3a9364;
  color: white;
  /* font-size: 56px; */
}
.inputName {
  color: white;
  font-size: 46px;
  font-family: "Press Start 2P", sans-serif;
  background: transparent;
  border: none;
  width: 250px;
}
.inputName::placeholder {
  color: white;
}
.button {
  font-family: "Press Start 2P", sans-serif;
  appearance: none;
  background-color: #3a9364;
  color: white;
  font-size: 12px;
  padding: 8px 15px;
  margin: 0 10px;
  box-shadow: none;
  border: none;
  cursor: pointer;
  /* position: relative;
  right: 0px;
  bottom: 20px; */
  font-size: 16px;
}
</style>
