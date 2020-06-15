<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html {
  min-height: 100%;
  position: relative;
}

body {
  margin: 0;
  /*   margin-bottom: 70px;
 */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.footercustom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
}

/* Css Loader Spinner */
.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #cdcbcb;
  background: -moz-linear-gradient(
    left,
    #cdcbcb 10%,
    rgba(205, 203, 203, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #cdcbcb 10%,
    rgba(205, 203, 203, 0) 42%
  );
  background: -o-linear-gradient(left, #cdcbcb 10%, rgba(205, 203, 203, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #cdcbcb 10%,
    rgba(205, 203, 203, 0) 42%
  );
  background: linear-gradient(
    to right,
    #cdcbcb 10%,
    rgba(205, 203, 203, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #cdcbcb;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  background: #ffffff;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
