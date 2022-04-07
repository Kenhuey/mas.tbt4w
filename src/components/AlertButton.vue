<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "AlertButton",
  },
  flex: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="alert-btn-container-non-flex">
    <div class="alert-btn-text">
      {{ props.text }}
    </div>
  </div>
</template>

<style lang="scss" scope>
@import "@/styles/common.scss";

.alert-btn-container {
  transition: $common-transition;
  user-select: none;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid $common-color-border;
  background-color: $common-color-background;
  color: $common-color-sub-text;
  cursor: pointer;

  &:hover {
    background-color: $common-color-hover;
    color: #ffffff;
    border: 1px solid $common-color-hover;
  }
}

.alert-btn-container-non-flex {
  @extend .alert-btn-container;
  display: inline-block !important;
  display: inline;
  width: auto;
}

.alert-btn-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 12px;
  line-height: 24px;
}
</style>
