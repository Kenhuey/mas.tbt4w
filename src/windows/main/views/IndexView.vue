<script lang="ts" setup>
import { callMainWindowCreateTextAlert } from "@/core/ipc/Renderer";

function test() {
  callMainWindowCreateTextAlert("test test testtesttesttesttest");
}
</script>

<template>
  <div>
    Hello
    <button @click="test">test</button>
  </div>
</template>
