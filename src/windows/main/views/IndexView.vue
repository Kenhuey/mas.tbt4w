<script lang="ts" setup>
import {
  callMainCreateTextAlert,
  addOnceCallbackWhenMainCreateTextAlertShowReply,
} from "@/core/ipc/Renderer";
import { StateQuery } from "@/core/util/StateQuery";

const stateQuery: StateQuery = new StateQuery();

async function test() {
  if (stateQuery.isQueryDone() === false) {
    return;
  }
  const replyUuid = stateQuery.createState();
  await callMainCreateTextAlert(
    "todo: 给statequery加个event emitter去监听回调",
    replyUuid
  );
  await addOnceCallbackWhenMainCreateTextAlertShowReply(replyUuid, () => {
    stateQuery.finishState(replyUuid);
  });
}
</script>

<template>
  <div>
    Hello
    <button @click="test">test</button>
  </div>
</template>
