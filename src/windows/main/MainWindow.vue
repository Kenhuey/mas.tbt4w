<script lang="ts" setup>
import ControlBar from "@/components/ControlBar.vue";
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
