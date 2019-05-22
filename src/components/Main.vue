<template>
  <div id="app">
    <div id="background" class="background">
      <!-- <img  id="bg" src="../../img/logo4.png"> -->
    </div>
    <modal-input-name v-if="showInput" v-on:savename="saveName"></modal-input-name>
    <modal-instructions
      @start="timer(seconds)"
      ref="instruct"
      v-if="showInstruction"
      v-on:showeditor="showeditor"
    ></modal-instructions>
    <div class="counter" @keydown.exact="combo">
      <!-- <codemirror
        v-if="showCodemirror"
        class="codemirror"
        ref="cm"
        v-model="newUser.codeUser"
        :options="cmOption"
        width="800"
      ></codemirror> -->
    <editor id="editor" v-model="newUser.codeUser" @init="editorInit" lang="html" theme="monokai"></editor>
    </div>
    <div class="nameTag">{{ newUser.nameUser }}</div>

    <div class="countdown">
      <h2>{{ timeLeft }}</h2>
    </div>
    <div class="combo">
      <p>Combo</p>
      <div class="countClass" id="count">{{ countSymbols }}</div>
      <div class="barClass" id="bar"></div>
      <div id="exclamations" class="exclamations">
        <span id="outputExclamation">{{ exclamationList[exclamation] }}</span>
      </div>
    </div>
    <div class="assetImg">
      <img
        id="myimg"
        :class="{ full: fullWidthImage }"
        @click="fullWidthImage = !fullWidthImage"
        alt
      >
    </div>
    <div class="buttons">
      <input class="button" type="submit" value="Finish" @click="confirmation()">
      <input class="button" type="submit" value="Instructions" @click="$refs.instruct.opened()">
    </div>
  </div>
</template>

<script>
import ModalInputName from "./ModalInputName.vue";
import ModalInstructions from "./ModalInstructions.vue";
// language
import "codemirror/mode/xml/xml.js";
// theme css
import "codemirror/theme/monokai.css";
// autoCloseTags
import "codemirror/addon/edit/closetag.js";
import { db, app } from "@/firebase";
import { setTimeout, clearTimeout } from "timers";

let usersRef = db.ref("users");
let storageRef = app.storage().ref();

export default {
  firebase: { users: usersRef },
  components: {
    ModalInputName,
    ModalInstructions,
    editor: require('vue2-ace-editor'),
  },
  data() {
    return {
      urlImg: "",
      showInput: false,
      showInstruction: false,
      showCodemirror: false,
      url: "",
      keyNames: [
        "Escape",
        "Tab",
        "CapsLock",
        "Shift",
        "Control",
        "Alt",
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12"
      ],
      keyTimeout: null,
      exclamationList: [
        "Super!",
        "Radical!",
        "Fantastic!",
        "Great!",
        "OMG",
        "Whoah!",
        ":O",
        "Nice!",
        "Molodec!",
        "Wild!",
        "Grand!",
        "Impressive!",
        "Stupendous!",
        "Extreme!",
        "Awesome!"
      ],
      exclamationsEvery: 10,
      exclamation: "",
      countSymbols: 0,
      seconds: 10,
      timeLeft: "00:00",
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
        viewportMargin: Infinity,
        lineWrapping: true,
        blastCode: { effect: 2 }
      }
    };
  },
  mounted() {
    this.showInput = true;
    this.uploadImg();
  },
  methods: {
    editorInit: function () {
            // require('brace/ext/language_  tools') //language extension prerequsite...
            require('brace/mode/html')  
            require('brace/mode/css')                
            require('brace/mode/less')
            require('brace/theme/monokai')
            // require('../assets/themes/mytheme')

            require('brace/snippets/javascript') //snippet
          
        },
    uploadImg() {
      let imgRef = storageRef.child("img/wG032WYr0zs.jpg");
      imgRef.getDownloadURL().then(function(url) {
        let xhr = new XMLHttpRequest();
        // xhr.responseType = "blob"; хз зачем
        xhr.onload = function() {
          // let blob = xhr.response; и это тоже хз зачем
        };
        xhr.open("GET", url);
        xhr.send();
        // console.log(url);
        // Or inserted into an <img> element:
        let img = document.getElementById("myimg");
        img.src = url;
        // this.urlImg = url;
        // console.log(this.urlImg);
        // this.url = url;
      });
    },
    // uploadImg() {
    //   let file = "wG032WYr0zs.jpg";
    //   let imgRef = storageRef.child("img/wG032WYr0zs.jpg");
    //   imgRef.on(
    //     "state_changed",
    //     function(snapshot) {},
    //     function(error) {
    //       console.log("this error");
    //     },
    //     function() {
    //       imgRef.snapshot.ref.getDownloadURL().then(url => {
    //         this.urlImg = url;
    //         console.log(this.urlImg);
    //       });
    //     }
    //   );
    //   // let getImgUrl = function(file) {
    //   //   imgRef
    //   //     .getDownloadURL()
    //   //     .then(function(url) {
    //   //       console.log(url);
    //   //       this.urlImg = url;
    //   //       return url;
    //   //     })
    //   //     .catch(function(error) {
    //   //       console.log("this error");
    //   //     });
    //   // };
    //   // console.log(this.getImgUrl);
    // },

    saveName(name) {
      this.newUser.nameUser = name;
      this.showInstruction = true;
    },
    showeditor(showEditor) {
      this.showCodemirror = showEditor;
    },
    done() {
      const user = usersRef.push(this.newUser);
      this.clear();
      this.$router.push(`/result/${user.key}`);
    },
    clear() {
      this.newUser.nameUser = this.newUser.codeUser = "";
    },
    confirmation() {
      let conf = confirm("Do you want to complete?");
      if (conf) {
        this.done();
      } else return;
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      this.countdown(end);
    },
    countdown(end) {
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
    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },

    hourConvert(hour) {
      // 15 --> 3
      return hour % 12 || 12;
    },
    combo() {
      let divCount = document.getElementById("count");
      let divBar = document.getElementById("bar");
      let body = document.getElementById("background");
      let outputExclamation = document.getElementById("outputExclamation");
      let name = document.getElementsByClassName('nameTag')[0];
      let button1 = document.getElementsByClassName("button")[0];
      let button2 = document.getElementsByClassName("button")[1];


      divCount.classList.add("bump");
      setTimeout(() => divCount.classList.remove("bump"), 250);

      const keyName = event.key;
      if (!this.keyNames.includes(keyName)) {
        this.countSymbols++;
        clearTimeout(this.powermode)
        if (this.countSymbols > 200) {
        body.classList.add("power-mode");
        divCount.classList.add("power-mode");
        divBar.classList.add("power-mode");
        outputExclamation.classList.add('power-mode')
        button1.classList.add('power-mode')
        button2.classList.add('power-mode')
        name.classList.add('power-mode')

        this.powermode = setTimeout(()=>{ body.classList.remove("power-mode");
        divCount.classList.remove("power-mode");
        divBar.classList.remove("power-mode")
        outputExclamation.classList.remove('power-mode')
        button1.classList.remove('power-mode')
        button2.classList.remove('power-mode')
        name.classList.remove('power-mode')},10000)
      }
        // this.powerMode();
        divBar.classList.remove("transition");
        setTimeout(() => divBar.classList.add("transition"), 4);
        if (
          this.countSymbols > 0 &&
          this.countSymbols % this.exclamationsEvery == 0
        ) {
          this.exclamation = Math.floor(
            Math.random() * this.exclamationList.length
          );
          outputExclamation.classList.add("exclamationAnimation");
          setTimeout(() => {
            outputExclamation.classList.remove("exclamationAnimation");
            this.exclamation = ""
          }, 1500);
        }

        clearTimeout(this.keyTimeout);
        this.keyTimeout = setTimeout(() => (this.countSymbols = 0), 10000);
      }
    },
    powerMode() {
      if (this.countSymbols > 200) {
        let body = document.getElementById("background");
        body.classList.add("power-mode");
        setTimeout(()=>{ body.classList.remove("power-mode")},10000)
      }
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Press Start 2P";
  src: url(../assets/fonts/PressStart2P.ttf) format("truetype");
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: text;
}
.background {
  background-image: url("../../img/logo4.png");
  background-color: #000;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-attachment: scroll;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: 520px 476px;

  &.power-mode {
    background-image: url(../../img/logo-power.png);
    animation: background-power 2s infinite both;
  }
}
.background img {
  width: 50%;
  height: 50%;
  position: absolute;
  top: 20%;
  left: 20%;
  
}

/* editor */

.cm-s-monokai.CodeMirror {
  background: transparent;
  min-height: 97vh;
}
.CodeMirror {
  height: auto;
  z-index: 1024;
}
.CodeMirror-linenumber.CodeMirror-gutter-elt {
  color: #4effa1;
}
.ace-monokai {
  background: transparent;
}
#editor {
  position: absolute;
  max-width: 99%;
  max-height: 95%;
  font-size: 16px;
}
/* buttons */

.buttons {
  position: absolute;
  right: 20px;
  bottom: 20px;
  position: fixed;
  z-index: 99999;
}
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

  &.power-mode {
    background: #0df;
  }
}

/* reference image */

.assetImg {
  position: fixed;
  right: 30px;
  bottom: 70px;
  z-index: 1035;
}
.full {
  position: relative;
  // left: 50%;
  // top: 50%;
  width: 100%;
  height: auto;
}

img {
  width: 150px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
}

img:hover {
  cursor: pointer;
}

.reference-container {
  position: absolute;
  z-index: 50;
  bottom: 62px;
  right: 20px;
  cursor: pointer;
  color: #fff;
  text-align: right;
  font-size: 12px;
  box-sizing: border-box;
}
.reference-screenshot {
  width: 200px;
  height: 160px;
  margin-top: 15px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.active {
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  padding: 25px;
  margin-top: 0;
  background-size: contain;
}

.nameTag {
  background: rgba(58, 147, 100, 0.75);
  color: #fff;
  font-size: 56px;
  position: absolute;
  right: 25px;
  top: 0;
  z-index: 10000;

  &.power-mode {
    background: #0df;
  }
}

.countdown {
  font-family: "Press Start 2P", sans-serif;
  text-align: right;
  position: fixed;
  color: #fff;
  right: 27px;
  top: 30px;
  z-index: 99999;
}

h2 {
  font-size: 60px;
  line-height: 1;
  text-align: center;
}

.time {
  display: flex;
  justify-content: center;
}
.combo {
  font-family: "Press Start 2P", sans-serif;
  text-align: right;
  position: fixed;
  color: #3a9364;
  right: 27px;
  top: 150px;
  font-size: 72px;
  animation: grow 0.25s both;
  z-index: 99999;
}
.combo p {
  color: #fff;
  font-size: 16px;
}
.countClass {
  font-size: 80px;
  color: #4effa1;
  z-index: 99999;

  &.bump {
    animation: grow 0.25s both;
  }
  &.power-mode {
    color: #0df;
  }
}
.barClass {
  position: relative;
  opacity: 0.5;
  margin-top: 23px;
  height: 8px;
  background: #4effa1;
  width: 100%;
  transform: scaleX(1);

  &.power-mode{
    background: #0df;
  }
}
.transition {
  transform: scaleX(0);
  transition: all 10000ms linear;
}

.exclamations {
  position: absolute;
  bottom: -20px;
  right: 0;
  display: block;
  color: #4effa1;
  opacity: 0.75;
  font-size: 20px;
  text-align: right;
}
.exclamationAnimation {
  right: 0;
  top: 0;
  display: block;
  position: absolute;
  min-width: 200px;
  animation: exclamation 1.5s ease-out both;

   &.power-mode {
    color:#0df;
  }
}

.power-mode {
  opacity: 1;
  animation: power-mode-indicator 750ms linear both;
}
.power-mode-indicator {
  opacity: 1;
  animation: power-mode-indicator 750ms linear both;
}

@keyframes grow {
  0% {
    animation-timing-function: ease-out;
  }
  50% {
    transform: scale(1.3);
    animation-timing-function: ease-in;
  }
}
@keyframes exclamation {
  100% {
    opacity: 0;
    transform: translate3D(0, 100px, 0);
  }
}

@keyframes background-power {
  0% {
    animation-timing-function: ease-out;
  }
  50% {
    transform: scale(1.5);
    animation-timing-function: ease-in;
  }
}


</style>


