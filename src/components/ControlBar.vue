<script lang="ts" setup>
import { Icon } from "@vicons/utils";
import { MinimizeFilled, CloseFilled } from "@vicons/material";
import {
  Maximize16Filled as Maximize,
  ArrowMinimize16Filled as Normalize,
} from "@vicons/fluent";
import { defineProps, defineEmits, ref } from "vue";
import { IpcRendererNames } from "@/core/ipc/Defines";
import { RendererProcessIpc } from "electron-better-ipc";
import { IpcRenderer } from "electron";

const ipcRenderer: RendererProcessIpc = eval("require")(
  "electron-better-ipc"
).ipcRenderer;

const ipcRendererRaw: IpcRenderer = eval("require")("electron").ipcRenderer;

const isMaxmize = ref(false);

ipcRendererRaw.on(IpcRendererNames.WINDOW_MAXIMIZE, () => {
  isMaxmize.value = true;
});

ipcRendererRaw.on(IpcRendererNames.WINDOW_NORMALIZE, () => {
  isMaxmize.value = false;
});

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  disableIcon: {
    type: Boolean,
    default: false,
  },
  disableMinimize: {
    type: Boolean,
    default: false,
  },
  disableMaximize: {
    type: Boolean,
    default: false,
  },
  disableClose: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["minimize", "maximize", "normalize", "close"]);

// Minimize window
function onWindowMinimize(): void {
  emits("minimize", async () => {
    ipcRenderer.callMain(IpcRendererNames.WINDOW_MINIMIZE);
  });
}

// Maximize window
function onWindowMaximize(): void {
  emits("maximize", async () => {
    await ipcRenderer.callMain(IpcRendererNames.WINDOW_MAXIMIZE);
  });
}

// Normalize window
function onWindowNormalize(): void {
  emits("normalize", async () => {
    await ipcRenderer.callMain(IpcRendererNames.WINDOW_NORMALIZE);
  });
}

// Close(Destory) window
function onWindowClose(): void {
  emits("close", async () => {
    ipcRenderer.callMain(IpcRendererNames.WINDOW_CLOSE);
  });
}
</script>

<template>
  <div class="cb-container">
    <img src="@/assets/logo.png" class="cb-logo" v-show="!disableIcon" />
    <div
      :class="{
        'cb-title-container': !disableIcon,
        'cb-title-container-no-icon': disableIcon,
      }"
    >
      {{ props.title }}
    </div>
    <div class="cb-btn-container">
      <Icon
        class="cb-btn-icon"
        @click="onWindowMinimize"
        v-show="!disableMinimize"
      >
        <MinimizeFilled style="margin-top: -5px" id="cb-btn-minimize" />
      </Icon>
      <Icon
        v-if="isMaxmize"
        v-show="!disableMaximize"
        class="cb-btn-icon"
        @click="onWindowNormalize"
      >
        <Normalize id="cb-btn-normalize" />
      </Icon>
      <Icon
        v-else
        class="cb-btn-icon"
        v-show="!disableMaximize"
        @click="onWindowMaximize"
      >
        <Maximize id="cb-btn-maximize" />
      </Icon>
      <Icon class="cb-btn-icon" v-show="!disableClose" @click="onWindowClose">
        <CloseFilled id="cb-btn-close" />
      </Icon>
    </div>
  </div>
</template>

<style lang="scss" scope>
@import "@/styles/common.scss";

$cb-btn-size: 18px;

.cb-container {
  color: $common-font-color;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  width: calc(100% - $common-padding * 2);
  box-shadow: 0 0 8px rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-left: $common-padding;
  padding-right: $common-padding;
  user-select: none;
  align-items: center;
  -webkit-app-region: drag;
}

.cb-logo {
  width: 16px;
  height: 16px;
}

.cb-title-container-no-icon {
  flex: 1;
  text-overflow: ellipsis;
}

.cb-title-container {
  @extend .cb-title-container-no-icon;
  padding-left: calc($cb-btn-size / 2);
}

.cb-btn-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-app-region: none;
}

.cb-btn-icon {
  font-size: $cb-btn-size;
  color: rgba($color: #000000, $alpha: 0.5);
  padding-left: calc($cb-btn-size / 2);
  padding-right: calc($cb-btn-size / 2);
  padding-top: 7px;
  padding-bottom: 7px;
  cursor: pointer;

  svg {
    transition: $common-transition;
  }

  #cb-btn-normalize {
    transform: rotate(-90deg);
  }

  &:hover {
    #cb-btn-minimize {
      transform: translateY($cb-btn-size / 4 - 1);
      color: rgba($color: #000000, $alpha: 0.3);
    }

    #cb-btn-maximize {
      transform: translateY($cb-btn-size / 8);
      color: rgba($color: #000000, $alpha: 0.3);
    }

    #cb-btn-normalize {
      transform: rotate(0deg);
      color: rgba($color: #000000, $alpha: 0.3);
    }

    #cb-btn-close {
      transform: rotate(90deg);
      color: rgba($color: #ff0000, $alpha: 0.5);
    }
  }

  &:active {
    #cb-btn-minimize {
      color: rgba($color: #000000, $alpha: 0.4);
    }

    #cb-btn-maximize {
      color: rgba($color: #000000, $alpha: 0.4);
    }

    #cb-btn-normalize {
      color: rgba($color: #000000, $alpha: 0.4);
    }

    #cb-btn-close {
      color: rgba($color: #ff0000, $alpha: 0.6);
    }
  }
}
</style>
