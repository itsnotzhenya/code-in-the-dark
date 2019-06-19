<template>
  <div id="app">
    <Styles/>
    <div id="background" class="background"></div>
    <modal-input-name v-if="showInput" v-on:savename="saveName"></modal-input-name>
    <modal-instructions
      @start="timer(seconds)"
      ref="instruct"
      v-if="showInstruction"
      v-on:showeditor="showeditor"
    ></modal-instructions>
    <modal name="Layout" :width="'700px'" height="auto">
      <img :src="assetUrl" class="big-image">
    </modal>
    <div class="counter" @keydown.exact="combo">
      <editor
        id="editor"
        v-show="showEditor"
        v-model="newUser.codeUser"
        @init="editorInit"
        lang="html"
        theme="monokai"
      ></editor>
    </div>
    <div class="nameTag">{{ newUser.name }}</div>

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
      <img @click="$modal.show('Layout')" :src="assetUrl" class="small-image">
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
import { db, app } from "@/firebase";
import { setTimeout, clearTimeout, clearInterval } from "timers";
import Styles from "./Styles.vue";

let usersRef = db.ref("users");
let storageRef = app.storage().ref();

export default {
  firebase: { users: usersRef },
  components: {
    ModalInputName,
    ModalInstructions,
    editor: require("vue2-ace-editor"),
    Styles
  },
  data() {
    return {
      assetUrl: "",
      showInput: false,
      showInstruction: false,
      showEditor: false,
      url: "",
      POWERMODE_COUNTER: 200,
      POWERMODE_EXTRA: 500,
      COMBO_TIMER: 10000,
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
      seconds: 900,
      timeLeft: "00:00",
      fullWidthImage: false,
      errors: [],
      newUser: {
        name: "",
        nameUser: "",
        codeUser: ""
      },
      body: null,
      name: null,
      editor: null,
      divCount: null,
      divBar: null,
      outputExclamation: null,
      button1: null,
      button2: null,
    };
  },
  mounted() {
    this.showInput = true;
    this.uploadImg();
    this.getElements()
  },
  methods: {
    editorInit: function() {
      require("brace/mode/html");
      require("brace/mode/css");
      require("brace/mode/less");
      require("brace/theme/monokai");
      require("brace/snippets/javascript");
    },
    uploadImg() {
      // let imgRef = storageRef.child("img/wG032WYr0zs.jpg");
      // imgRef.getDownloadURL().then(function(url) {
      //   let xhr = new XMLHttpRequest();
      //   xhr.onload = function() {};
      //   xhr.open("GET", url);
      //   xhr.send();
      //   console.log(url);
      //   this.assetUrl = url;
      //   console.log(this.assetUrl);
      // });
      this.assetUrl =
        "https://firebasestorage.googleapis.com/v0/b/code-19f91.appspot.com/o/task%2Fphotoeditorsdk-export.png?alt=media&token=3c739828-55be-49e7-87f4-25f4c4638f48";
    },
    saveName(name) {
      this.newUser.name = name;
      this.showInstruction = true;
    },
    showeditor(showEditor) {
      this.showEditor = showEditor;
    },
    done() {
      let date = new Date().getTime();
      this.newUser.nameUser = this.newUser.name + date;
      const user = usersRef.push(this.newUser);
      // this.clear();
      this.$router.push(`/result/${user.key}`);
    },
    clear() {
      this.newUser.nameUser = this.newUser.codeUser = this.newUser.name = "";
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
    getElements(){
      this.divCount = document.getElementById("count");
      this.divBar = document.getElementById("bar");
      this.body = document.getElementById("background");
      this.outputExclamation = document.getElementById("outputExclamation");
      this.name = document.getElementsByClassName("nameTag")[0];
      this.button1 = document.getElementsByClassName("button")[0];
      this.button2 = document.getElementsByClassName("button")[1];
      this.editor = document.getElementById("editor");
    },
    combo() {
      this.divCount.classList.add("bump");
      setTimeout(() => this.divCount.classList.remove("bump"), 250);

      const keyName = event.key;
      if (!this.keyNames.includes(keyName)) {
        this.countSymbols++;
        if (this.countSymbols > this.POWERMODE_COUNTER) {
          this.powermodeOn();
        }
        this.divBar.classList.remove("transition");
        setTimeout(() => this.divBar.classList.add("transition"), 4);
        if (
          this.countSymbols > 0 &&
          this.countSymbols % this.exclamationsEvery == 0
        ) {
          this.exclamation = Math.floor(
            Math.random() * this.exclamationList.length
          );
          this.outputExclamation.classList.add("exclamationAnimation");
          setTimeout(() => {
            this.outputExclamation.classList.remove("exclamationAnimation");
            this.exclamation = "";
          }, 1500);
        }

        clearTimeout(this.keyTimeout);
        this.keyTimeout = setTimeout(() => {
          this.countSymbols = 0;
          this.powermodeOff();
        }, this.COMBO_TIMER);
      }
    },
    powermodeOn() {
      this.body.classList.add("power-mode");
      this.divCount.classList.add("power-mode");
      this.divBar.classList.add("power-mode");
      this.outputExclamation.classList.add("power-mode");
      this.button1.classList.add("power-mode");
      this.button2.classList.add("power-mode");
      this.name.classList.add("power-mode");
      this.editor.classList.remove('power')  
      setTimeout(() => this.editor.classList.add("power"), 4);
    },
    powermodeOff() {
      this.body.classList.remove("power-mode");
      this.editor.classList.remove("power");
      this.divCount.classList.remove("power-mode");
      this.divBar.classList.remove("power-mode");
      this.outputExclamation.classList.remove("power-mode");
      this.button1.classList.remove("power-mode");
      this.button2.classList.remove("power-mode");
      this.name.classList.remove("power-mode");
    }
  }
};
</script>