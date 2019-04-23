<template class="template">
  <div id="app">
    <div class="background" @click="onFocus"></div>
    <!-- TODO: разбить на компоненты и вынести модалки -->
    <!-- <modal name="inputName" :width="250" :height="100">
      <div class="modal-mask">
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
    </modal>-->
    <!-- <modal name="instructions" :width="470" :height="200">
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
    </modal>-->
    <modal-input-name @nameUser="nameUser"></modal-input-name>
    <modal-instructions></modal-instructions>
    <codemirror class="codemirror" v-model="newUser.codeUser" :options="cmOption" width="800"></codemirror>
    <div class="countdown">
      <h2>{{ timeLeft }}</h2>
    </div>
    <ul style="position: absolute; disply: inline-block">
      <li v-for="(time, index) in times" :key="index" class="column time">
        <a
          v-on:click.prevent="setTime(time.sec)"
          :class="[
                'button',
                'is-link',
                {'is-active': time.sec === selectedTime && endTime !== 0 }
              ]"
        >{{ time.display }}</a>
      </li>
    </ul>

    <div class="assetImg">
      <!-- <img id="myimg" alt="asset image" @click="showIage()"> -->
      <img
        id="myimg"
        :class="{ full: fullWidthImage }"
        @click="fullWidthImage = !fullWidthImage"
        alt
      >
    </div>
    <div class="buttons">
      <input class="button" type="submit" value="Finish" @click="confirmation()">
      <input
        class="button"
        type="submit"
        value="Instructions"
        @click="this.$modal.show('instructions')"
      >
    </div>
  </div>
</template>

<script>
//components
import ModalInputName from "./components/ModalInputName.vue";
import ModalInstructions from "./components/ModalInstructions.vue";

// language
import "codemirror/mode/xml/xml.js";
// theme css
import "codemirror/theme/monokai.css";
// autoCloseTags
import "codemirror/addon/edit/closetag.js";

import Firebase from "firebase";
import toastr from "toastr";
// import { constants } from "fs"; хз зачем
let config = {
  apiKey: "AIzaSyDWZvyI83vGieUtviHwaNeEq802ekbRjrc",
  authDomain: "code-19f91.firebaseapp.com",
  databaseURL: "https://code-19f91.firebaseio.com",
  projectId: "code-19f91",
  storageBucket: "gs://code-19f91.appspot.com",
  messagingSenderId: "855561499950"
};

let app = Firebase.initializeApp(config);
let db = app.database();
let usersRef = db.ref("users");
let storageRef = app.storage().ref();
let imgRef = storageRef.child("img/wG032WYr0zs.jpg");
// console.log(imgRef.getDownloadURL());
imgRef.getDownloadURL().then(function(url) {
  let xhr = new XMLHttpRequest();
  // xhr.responseType = "blob"; хз зачем
  xhr.onload = function() {
    // let blob = xhr.response; и это тоже хз зачем
  };
  xhr.open("GET", url);
  xhr.send();

  // Or inserted into an <img> element:
  let img = document.getElementById("myimg");
  img.src = url;
});

export default {
  firebase: { users: usersRef },
  components: {
    ModalInputName,
    ModalInstructions
  },
  data() {
    return {
      selectedTime: 0, //зачеm это нужно?
      timeLeft: "00:00",
      times: [
        {
          sec: 15,
          display: "start"
        }
      ],
      fullWidthImage: false,
      errors: [],
      newUser: {
        nameUser: "",
        codeUser: ""
      },
      cmOption: {
        mode: "text/html",
        theme: "monokai",
        lineNumbers: true,
        autofocus: true,
        autoCloseTags: true,
        collapseIdentical: false,
        highlightDifferences: true,
        viewportMargin: Infinity
      }
    };
  },
  mounted() {
    // this.opened();
  },
  methods: {
    onFocus() {},
    nameUser(name) {
      this.newUser.nameUser = name;
    },
    done() {
      usersRef.push(this.newUser);
      this.newUser.nameUser = "";
      this.newUser.codeUser = "";
      toastr.success("you have completed the task");
    },
    confirmation() {
      //подтверждение при нажатии кнопки "готово"
      let conf = confirm("Do you want to complete?");
      if (conf) {
        this.done();
      } else return;
    },
    opened() {
      // this.$modal.show("inputName");
      this.$refs.modalInput.open();
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
    },
    showImage() {
      // TODO: увеличение картинки при нажатии
    },
    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      //отсчет времени
      // this.initialTime = this.selectedTime;
      this.intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(this.intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${this.zeroPadded(minutes)}:${this.zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${this.hourConvert(hour)}:${this.zeroPadded(minutes)}`;
    },
    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },

    hourConvert(hour) {
      // 15 --> 3
      return hour % 12 || 12;
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
  background: #000000;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: text;
}
.background {
  background-image: url("../img/logo.png");
  background-color: #000;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-attachment: scroll;
  position: fixed;
  height: 100vh;
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: 520px 476px;
}

/* editor */

.cm-s-monokai.CodeMirror {
  background: transparent;
  height: auto;
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

/* modal */

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

/* buttons */

.button {
  font-family: "Press Start 2P", sans-serif;
  appearance: none;
  background-color: #3a9364;
  margin: 0 10px;
  box-shadow: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 15px;
}
.buttons {
  position: absolute;
  right: 10px;
  bottom: 20px;
  position: fixed;
}
.v--modal-box .v--modal {
  z-index: 9999;
}
.ok {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.instructions {
  margin: 10px;
}
.assetImg {
  position: absolute;
  right: 20px;
  bottom: 70px;
  z-index: 1035;
  /* height: 160px; */
}
/* .assetImg img {
  max-width: 150px;
} */

.full {
  width: 100%;
  height: auto;
}
img {
  width: 150px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  /* transition: width 1s; */
}
img:hover {
  cursor: pointer;
}

.countdown {
  font-family: "Press Start 2P", sans-serif;
  text-align: right;
  margin: 5px 0 30px;
  position: absolute;
  color: #fff;
  right: 27px;
}

h2 {
  font-size: 60px;
  /* width: 390px; */
  line-height: 1;
  text-align: center;
  /* font-family: "Press  Start 2P", sans-serif; */
}
h3 {
  font-size: 18px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  /* font-family: "Press  Start 2P", sans-serif; */
}
h3 span {
  width: 70px;
  border-bottom: 2px solid hsl(348, 100%, 71%);
  margin-left: 15px;
  text-align: center;
}
.time {
  display: flex;
  justify-content: center;
}
ul {
  right: 10px;
  bottom: 60vh;
}
</style>
