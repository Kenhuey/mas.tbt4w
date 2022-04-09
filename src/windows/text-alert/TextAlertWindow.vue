<script lang="ts" setup>
import ControlBar from "@/components/ControlBar.vue";
import AlertButton from "@/components/AlertButton.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import {
  callMainGetTextFromStringPool,
  callMainRemoveTextFromStringPool,
} from "@/core/ipc/Renderer";
import { IpcRendererNames } from "@/core/ipc/Defines";
import { RendererProcessIpc } from "electron-better-ipc";

const route = useRoute();

const ipcRenderer: RendererProcessIpc = eval("require")(
  "electron-better-ipc"
).ipcRenderer;

const rawQueryUuid = route.query.spuuid?.toString();
const stringPoolUuid = rawQueryUuid === undefined ? "undefined" : rawQueryUuid;

const text = ref("");

onMounted(async () => {
  const retText = await callMainGetTextFromStringPool(stringPoolUuid);
  text.value = retText;
  await callMainRemoveTextFromStringPool(stringPoolUuid);
});

function closeWindow() {
  ipcRenderer.callMain(IpcRendererNames.WINDOW_CLOSE);
}
</script>

<template>
  <div class="text-alert-container">
    <ControlBar
      @minimize="(next) => next()"
      @close="(next) => next()"
      disableMaximize
      disableMinimize
      disableIcon
      :title="$t('window.title_alert')"
    />
    <div class="text-alert-content-container">
      <div class="text-alert-content">
        {{ text }}
      </div>
    </div>
    <div class="text-alert-btn-container">
      <AlertButton :text="$t('button.ok')" @click="closeWindow" />
    </div>
  </div>
</template>

<style lang="scss" scope>
@import "@/styles/common.scss";

.text-alert-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: $common-font-family !important;
}

.text-alert-content-container {
  flex: 1;
  padding: $common-padding;
  display: flex;
  flex-direction: column;
  overflow: auto;
  text-align: center;
}

.text-alert-content {
  display: inline-block;
  text-align: left;
  user-select: none;
  flex: 1;
}

.text-alert-btn-container {
  padding: $common-padding;
  display: flex;
  flex-direction: row-reverse;
}
</style>
