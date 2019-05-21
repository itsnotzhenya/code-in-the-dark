<template>
  <div class="app">
    <div class="code" v-html="code"></div>
  </div>
</template>

<script>
import { app, db } from "@/firebase";
import { constants } from "crypto";
export default {
  data() {
    return {
      code: "",
      user: null
    };
  },
  firebase: {
    usersArr: db.ref("users"),
    usersObj: {
      source: db.ref("users"),
      asObject: true
    }
  },
  mounted() {
    this.user = this.usersObj[this.$route.params.id];
    this.code = this.user.codeUser;
  }
};
</script>

<style>
</style>
