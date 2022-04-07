<script lang="ts" setup>
import ControlBar from "@/components/ControlBar.vue";
import { IpcRendererNames } from "@/core/ipc/Defines";

const { ipcRenderer } = eval("require")("electron-better-ipc");
const Electron = eval("require")("electron");
const remote = Electron.remote; /* Not recommend to use */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
remote.getCurrentWindow().on("close", (event: any) => {
  beforeCloseMainWindow();
  event.preventDefault();
});

function beforeCloseMainWindow(): void {
  // ipcRenderer.callMain(IpcRendererNames.WINDOW_HIDE);
  ipcRenderer.callMain(IpcRendererNames.WINDOW_CLOSE);
}
</script>

<template>
  <div class="app-container">
    <ControlBar
      @minimize="(next) => next()"
      @maximize="(next) => next()"
      @normalize="(next) => next()"
      @close="beforeCloseMainWindow"
      title="MainWindow"
    />
    <div class="app-content-container">
      <nav>
        <router-link to="">Main</router-link>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scope>
@import "@/styles/common.scss";

.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: $common-font-family !important;
}

.app-content-container {
  flex: 1;
}
</style>
