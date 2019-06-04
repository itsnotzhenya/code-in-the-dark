<template><div></div></template>

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
    background-image: url(../../img/logo-power2.png);
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
  // z-index: 99999;
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
    background: #3a5a93;
  }
}

/* reference image */

.assetImg {
  position: fixed;
  right: 30px;
  bottom: 70px;
  // z-index: 1035;
}
.full {
  position: relative;
  width: 100%;
  height: auto;
}

.small-image {
  width: 150px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px powerrgba(0, 0, 0, 0.5);
}

.small-image:hover {
  cursor: pointer;
}
.big-image {
  width: 900px;
}

.reference-container {
  position: absolute;
  // z-index: 50;
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
  background: transparentize(#3a9364, 0.25);
  color: #fff;
  font-size: 56px;
  position: absolute;
  right: 25px;
  top: 0;
  // z-index: 10000;
  padding: 0px 10px;

  &.power-mode {
    background: transparentize(#00ddff, 0.25);
  }
}

.countdown {
  font-family: "Press Start 2P", sans-serif;
  text-align: right;
  position: fixed;
  color: #fff;
  right: 27px;
  top: 30px;
  // z-index: 99999;
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
  // z-index: 99999;
}
.combo p {
  color: #fff;
  font-size: 16px;
}
.countClass {
  font-size: 80px;
  color: #4effa1;
  // z-index: 99999;

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

  &.power-mode {
    background: #00ddff;
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
    color: #0df;
  }
}

// body.power-mode {
//   opacity: 1;
//   animation: power 750ms linear both;

//   .power {
//     opacity: 1;
//     animation: power 750ms linear both;
//   }
// }
.power {
  opacity: 1;
  animation: power 750ms linear both;
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
@keyframes power-mode-indicator {
  0% {
    transform: matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  3.2% {
    transform: matrix3d(
      0.673,
      0.192,
      0,
      0,
      0.126,
      0.673,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  4.5% {
    transform: matrix3d(
      0.743,
      0.25,
      0,
      0,
      0.163,
      0.743,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  6.41% {
    transform: matrix3d(
      0.836,
      0.301,
      0,
      0,
      0.196,
      0.836,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  9.01% {
    transform: matrix3d(
      0.94,
      0.308,
      0,
      0,
      0.201,
      0.94,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  12.71% {
    transform: matrix3d(
      1.032,
      0.234,
      0,
      0,
      0.154,
      1.032,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  13.51% {
    transform: matrix3d(
      1.044,
      0.212,
      0,
      0,
      0.14,
      1.044,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  17.92% {
    transform: matrix3d(
      1.07,
      0.098,
      0,
      0,
      0.066,
      1.07,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  18.92% {
    transform: matrix3d(
      1.069,
      0.077,
      0,
      0,
      0.052,
      1.069,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  25.23% {
    transform: matrix3d(
      1.038,
      -0.001,
      0,
      0,
      -0.001,
      1.038,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  29.03% {
    transform: matrix3d(
      1.016,
      -0.015,
      0,
      0,
      -0.01,
      1.016,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  31.43% {
    transform: matrix3d(
      1.006,
      -0.017,
      0,
      0,
      -0.011,
      1.006,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  34.63% {
    transform: matrix3d(
      0.997,
      -0.014,
      0,
      0,
      -0.01,
      0.997,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  40.14% {
    transform: matrix3d(
      0.992,
      -0.007,
      0,
      0,
      -0.005,
      0.992,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  56.46% {
    transform: matrix3d(1, 0.001, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  62.36% {
    transform: matrix3d(
      1.001,
      0.001,
      0,
      0,
      0,
      1.001,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  81.48% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  84.68% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}
@keyframes power {
  0% {
  }
  3.2% {
    transform: translate(10px, 5px);
  }
  4.5% {
    transform: translate(-10px, 5);
  }
  6.4% {
    transform: translate(5px, -10px);
  }
  9% {
    transform: translate(10px, 5px);
  }
  12% {
    transform: translate(-15px, 10px);
  }
  15.5% {
    transform: translate(10px, 5px);
  }
  17% {
    transform: translate(0px, -5px);
  }
  18.9% {
    transform: translate(5px, 5px);
  }
  25% {
    transform: translate(10px, -10px);
  }
  29% {
    transform: translate(0px, 5px);
  }
  31.4% {
    transform: translate(-10px, 5px);
  }
  40% {
    transform: translate(0px, 5px);
  }
  56% {
    transform: translate(10px, -0px);
  }
  62% {
    transform: translate(5px, 5px);
  }
  81% {
    transform: translate(0px, -5px);
  }
  87% {
    transform: translate(10px, 0px);
  }
  100% {
    transform: translate(-10px, 5px);
  }
}
</style>
