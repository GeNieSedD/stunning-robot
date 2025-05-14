<template>
  <transition name="fade" class="pop-up" appear>
    <div v-if="visible" :class="['popup', type]">
      <div class="circle">
        <img :src="iconSrc" class="icon" />
      </div>
      <h3 class="healding-1">{{ heading }}</h3>
      <span class="texting-1">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch } from "vue";
import successSound from "../sound/success.mp3";
import errorSound from "../sound/error.mp3";
import warningSound from "../sound/warning.mp3";
import { usePopup } from "../module/script/usePopup";

const { visible, message, type, heading } = usePopup();

const iconMap = {
  success: new URL("../svg/check.svg", import.meta.url).href,
  error: new URL("../svg/alert-circle.svg", import.meta.url).href,
  warning: new URL("../svg/triangle-alert.svg", import.meta.url).href,
};

const soundMap = {
  success: new Audio(successSound),
  error: new Audio(errorSound),
  warning: new Audio(warningSound),
};

const iconSrc = computed(() => iconMap[type.value]);

watch(visible, (val) => {
  if (val) {
    soundMap[type.value]?.play();
  }
});
</script>
<style setup>
@import "../css/components/variables/text-style.css";
@import "../css/components/variables/variables.css";
@import "../css/components/block/other/other.css";
@import "../css/pages/popup.css";
</style>
