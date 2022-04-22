<script lang="ts" setup>
import ControlBar from "@/components/ControlBar.vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@vicons/utils";
import { Code16Filled, Settings16Filled } from "@vicons/fluent";

const route = useRoute();
const currentRouteName = ref(route.name);
watch(
  () => route.name,
  (to) => {
    currentRouteName.value = to;
  }
);

const router = useRouter();

function routerPushTo(name: string) {
  router.push({ name: name });
  if (name !== currentRouteName.value) {
    //
  }
}
</script>

<template>
  <div class="app-container">
    <ControlBar
      @minimize="(next) => next()"
      @maximize="(next) => next()"
      @normalize="(next) => next()"
      @close="(next) => next()"
      :title="$t('window.title_main')"
    />
    <div class="mw-content-container">
      <div class="mw-tab-container">
        <div class="mw-tab-container-side" style="padding-bottom: 8px">
          <div
            class="mw-tab-option"
            :class="{ 'mw-tab-selected': currentRouteName === 'mw-overview' }"
            @click="routerPushTo('mw-overview')"
          >
            <div class="mw-tab-selected-side-border"></div>
            <Icon>
              <Code16Filled />
            </Icon>
          </div>
        </div>
        <div class="mw-tab-container-user">user</div>
        <div class="mw-tab-container-side" style="padding-top: 8px">
          <div
            class="mw-tab-option"
            :class="{ 'mw-tab-selected': currentRouteName === 'mw-setting' }"
            @click="routerPushTo('mw-setting')"
          >
            <div class="mw-tab-selected-side-border"></div>
            <Icon>
              <Settings16Filled />
            </Icon>
          </div>
        </div>
      </div>
      <router-view class="mw-content-router-view" />
    </div>
  </div>
</template>

<style lang="scss" scope>
@import "@/styles/common.scss";

.mw-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: $common-font-family !important;
}

.mw-content-container {
  flex: 1;
  display: flex;
  // flex-direction: column;
  overflow: auto;
}

.mw-content-router-view {
  overflow: auto;
  flex: 1;
  margin: $common-padding;
}

.mw-tab-container {
  // background-color: #fbfbfb;
  // border-radius: 4px;
  // margin: calc($common-padding * 2);
  // border: 1px solid #e5e5e5;
  padding: $common-padding;
  display: flex;
  flex-direction: column;
}

.mw-tab {
  border-radius: 8px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  user-select: none;
  padding: 4px;
  font-size: 22px;
  color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: $common-transition;

  &:hover {
    background-color: #e7e7e7;
  }
}

.mw-tab-selected {
  transition: $common-transition;
  background-color: #eaeaea;
  color: rgba($color: #000000, $alpha: 0.6);

  .mw-tab-selected-side-border {
    transition: $common-transition;
    position: absolute;
    border-radius: 16px;
    width: 3px;
    height: 14px;
    background-color: #1d6978;
    margin-left: -34px;
  }
}

.mw-tab-option {
  @extend .mw-tab;
}

.mw-tab-container-side {
  display: flex;
  flex-direction: column;
}

.mw-tab-container-user {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
