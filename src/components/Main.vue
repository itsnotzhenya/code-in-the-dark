<template>
  <div id="app">
    <div id="background" class="background"></div>
    <modal-input-name v-if="showInput" v-on:savename="saveName"></modal-input-name>
    <modal-instructions
      @start="timer(seconds)"
      ref="instruct"
      v-if="showInstruction"
      v-on:showeditor="showeditor"
    ></modal-instructions>
    <div class="Counter" @keydown.exact="combo">
      <codemirror
        v-on:keyup="combo"
        v-if="showCodemirror"
        class="codemirror"
        ref="cm"
        v-model="newUser.codeUser"
        :options="cmOption"
        width="800"
      ></codemirror>
    </div>

    <div class="countdown">
      <h2>{{ timeLeft }}</h2>
    </div>
    <div class="nameTag">{{ newUser.nameUser }}</div>
    <div class="combo">
      <p>Combo</p>
      <div class="count" id="count">{{ countSymbols }}</div>
      <div class="bar" id="bar"></div>
      <div id="exclamations" class="exclamations">
        <span id="span">{{ exclamations[exclamation] }}</span>
      </div>
    </div>
    <!-- <div class="reference-container">
      <div
        class="reference-screenshot"
        style="background-image:url(../img/wG032WYr0zs.jpg);"
        @click="fullImg"
      ></div>
    </div>-->
    <div class="assetImg">
      <img
        id="myimg"
        :class="{ full: fullWidthImage }"
        @click="fullWidthImage = !fullWidthImage"
        alt
      >
      <!-- <img id="myimg"> -->
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
    ModalInstructions
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
      exclamations: [
        "Super!",
        "Radical!",
        "Fantastic!",
        "Great!",
        "OMG",
        "Whoah!",
        ":O",
        "Nice!",
        "Splendid!",
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
        lineWrapping: true
      }
    };
  },
  mounted() {
    this.showInput = true;
    this.uploadImg();
  },
  methods: {
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
    onFocus() {
      // this.$refs.cm.cm.focus();
    },
    saveName(name) {
      this.newUser.nameUser = name;
      this.showInstruction = true;
    },
    showeditor(showEditor) {
      this.showCodemirror = showEditor;
    },
    push() {},
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
      // this.powerMode();
      let divCount = document.getElementById("count");
      let divBar = document.getElementById("bar");

      divCount.classList.add("bump");
      setTimeout(() => divCount.classList.remove("bump"), 250);

      const keyName = event.key;
      if (!this.keyNames.includes(keyName)) {
        this.countSymbols++;
        divBar.classList.remove("transition");
        setTimeout(() => divBar.classList.add("transition"), 4);
        if (
          this.countSymbols > 0 &&
          this.countSymbols % this.exclamationsEvery == 0
        ) {
          let excl = document.getElementById("exclamations");
          const span = document.getElementById("span");
          this.exclamation = Math.floor(
            Math.random() * this.exclamations.length
          );
          span.classList.add("exclamation");
          console.log(span.classList);
          setTimeout(span.classList.remove("exclamation"), 3000);
          // setTimeout((this.exclamation = ""), 10000);
        }

        clearTimeout(this.keyTimeout);
        this.keyTimeout = setTimeout(() => (this.countSymbols = 0), 10000);
      }
    },
    powerMode() {
      if (this.countSymbols > 200) {
        let body = document.getElementById("background");
        body.classList.add("power-mode");
        // body.classList.add("power-mode-indicator");
        console.log(body.classList);
      }
      clearTimeout(this.keyTimeout);
      this.keyTimeout = setTimeout(() => (this.countSymbols = 0), 10000);
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
}

/* editor */

.cm-s-monokai.CodeMirror {
  background: transparent;
  // height: auto;
  min-height: 97vh;
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
.CodeMirror-linenumber.CodeMirror-gutter-elt {
  color: #4effa1;
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
  right: 20px;
  bottom: 20px;
  position: fixed;
  z-index: 99999;
}

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
.count {
  font-size: 80px;
  color: #4effa1;
  z-index: 99999;

  &.bump {
    animation: grow 0.25s both;
  }
}
.bar {
  position: relative;
  opacity: 0.5;
  margin-top: 23px;
  height: 8px;
  background: #4effa1;
  width: 100%;
  transform: scaleX(1);
}
.transition {
  transform: scaleX(0);
  transition: all 10000ms linear;
}

.exclamations {
  position: absolute;
  bottom: -50px;
  right: 0;
  display: block;
  color: #4effa1;
  opacity: 0.75;
  font-size: 20px;
  text-align: right;
}
.exclamation {
  right: 0;
  top: 0;
  display: block;
  position: absolute;
  min-width: 200px;
  background: #fff;
  animation: exclamation 1.5s ease-out both;
}

.nameTag {
  background: rgba(58, 147, 100, 0.75);
  color: #fff;
  font-size: 56px;
  position: absolute;
  right: 20px;
  top: 0;
  z-index: 10000;
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


