<template>
  <span @click="() => (props.handle ? props.handle(props.type) : null)" class="bitunix-tv-icons" v-tooltip="props.tooltip ? props.tooltip : null">
    <!-- 显示设置 -->
    <svg v-if="props.type === 'display'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.3674 12.2449C14.2977 12.2449 14.2287 12.2586 14.1643 12.2853C14.0999 12.3119 14.0414 12.351 13.9922 12.4003C13.9429 12.4496 13.9038 12.508 13.8771 12.5724C13.8505 12.6368 13.8367 12.7058 13.8367 12.7755C13.8367 12.8452 13.8505 12.9142 13.8771 12.9785C13.9038 13.0429 13.9429 13.1014 13.9922 13.1507C14.0414 13.2 14.0999 13.239 14.1643 13.2657C14.2287 13.2924 14.2977 13.3061 14.3674 13.3061C14.5081 13.3061 14.643 13.2502 14.7426 13.1507C14.8421 13.0512 14.898 12.9162 14.898 12.7755C14.898 12.6348 14.8421 12.4998 14.7426 12.4003C14.643 12.3008 14.5081 12.2449 14.3674 12.2449Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M10.6531 12.7755H1.10205" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M14.3674 7.46935C14.2266 7.46935 14.0917 7.52526 13.9922 7.62477C13.8926 7.72428 13.8367 7.85924 13.8367 7.99997C13.8367 8.14069 13.8926 8.27566 13.9922 8.37517C14.0917 8.47467 14.2266 8.53058 14.3674 8.53058C14.5081 8.53058 14.643 8.47467 14.7426 8.37517C14.8421 8.27566 14.898 8.14069 14.898 7.99997C14.898 7.85924 14.8421 7.72428 14.7426 7.62477C14.643 7.52526 14.5081 7.46935 14.3674 7.46935Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M10.6531 8H1.10205" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M14.3674 2.69384C14.2266 2.69384 14.0917 2.74974 13.9922 2.84925C13.8926 2.94876 13.8367 3.08373 13.8367 3.22445C13.8367 3.36518 13.8926 3.50014 13.9922 3.59965C14.0917 3.69916 14.2266 3.75507 14.3674 3.75507C14.5081 3.75507 14.643 3.69916 14.7426 3.59965C14.8421 3.50014 14.898 3.36518 14.898 3.22445C14.898 3.08373 14.8421 2.94876 14.7426 2.84925C14.643 2.74974 14.5081 2.69384 14.3674 2.69384Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M10.6531 3.22443H1.10205" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <!-- 全屏 -->
    <svg v-if="props.type === 'fullscreen'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_5346_11290)">
        <path d="M9.71429 6.2857L15.4286 0.571411" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.8571 0.571411H15.4285V5.14284" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.2857 6.2857L0.571411 0.571411" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.14284 0.571411H0.571411V5.14284" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.71429 9.71423L15.4286 15.4285" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.8571 15.4285H15.4285V10.8571" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.2857 9.71423L0.571411 15.4285" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.14284 15.4285H0.571411V10.8571" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_5346_11290">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <!-- 退出全屏 -->
    <svg v-if="props.type === 'exitFullscreen'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2270_9102)">
        <path d="M1 1L5.33333 5.29983" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 15L5.33333 10.6665" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15 15L10.7002 10.6665" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15 1L10.6667 5.29983" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 2V6H14" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6 2V6H2" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6 14V10H2" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 14V10H14" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2270_9102">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <!-- 指标 -->
    <svg v-if="props.type === 'indicator'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_5346_11260)">
        <path d="M1.10203 1.10205V14.898H14.898" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4.28571 7.46941L6.93877 10.1225L11.1837 3.75513L14.898 6.40819" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_5346_11260">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <!-- 重置 -->
    <svg v-if="props.type === 'reset'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_5346_11279)">
        <path d="M2.73633 14.8428V12.2109H5.36817" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M14.7271 6.74243C15.0063 8.23234 14.783 9.7728 14.0922 11.1221C13.4014 12.4714 12.2822 13.5531 10.9101 14.1976C9.53812 14.8421 7.99095 15.0129 6.5114 14.6831C5.03186 14.3533 3.70368 13.5416 2.73526 12.3754"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1.27289 9.25753C0.993653 7.76762 1.21696 6.22716 1.90778 4.87787C2.5986 3.52858 3.71783 2.44682 5.08985 1.80233C6.46188 1.15784 8.00904 0.987102 9.48859 1.3169C10.9681 1.6467 12.2963 2.45837 13.2647 3.62455"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M13.2637 1.15723V3.78906H10.6318" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M6.16591 8.20126C5.9447 8.16216 5.9447 7.83912 6.16591 7.80002C6.55758 7.7307 6.92007 7.54432 7.20719 7.26464C7.4943 6.98497 7.69302 6.62468 7.77801 6.2297L7.79124 6.16753C7.83914 5.94512 8.15046 5.94384 8.20025 6.16561L8.21664 6.23803C8.3049 6.63123 8.50542 6.98913 8.79302 7.2668C9.08062 7.54448 9.44248 7.72954 9.83315 7.79874C10.0556 7.83784 10.0556 8.1628 9.83315 8.20254C9.44256 8.2717 9.08076 8.45667 8.79317 8.73422C8.50557 9.01177 8.30501 9.36953 8.21664 9.76261L8.20025 9.83439C8.15046 10.0562 7.83914 10.0549 7.79124 9.83247L7.77864 9.77094C7.69356 9.37578 7.49466 9.01537 7.2073 8.73568C6.91995 8.45599 6.55717 8.26971 6.16528 8.20062L6.16591 8.20126Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5346_11279">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <!-- 图表类型 -->
    <svg v-if="props.type === 'series'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.28572" y="3.42859" width="4.57143" height="8" rx="0.8" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4.8 2.79999V0.799988" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.4286 6.57141V4.57141" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4.8 13.6V11.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.4286 14.5714V12.5714" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="9.14286" y="6.85712" width="4.57143" height="5.71429" rx="0.8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <!-- 设置 -->
    <svg v-if="props.type === 'setting'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.12163 2.95919L6.57795 1.78123C6.65491 1.58179 6.79031 1.41024 6.96641 1.28905C7.14252 1.16786 7.35112 1.10268 7.56489 1.10205H8.43509C8.64887 1.10268 8.85747 1.16786 9.03357 1.28905C9.20968 1.41024 9.34508 1.58179 9.42203 1.78123L9.87836 2.95919L11.4277 3.85062L12.68 3.6596C12.8885 3.6313 13.1007 3.66562 13.2897 3.75821C13.4786 3.8508 13.6358 3.99748 13.7412 4.1796L14.1657 4.92246C14.2745 5.10748 14.3246 5.32114 14.3094 5.53523C14.2943 5.74932 14.2146 5.95379 14.0808 6.12164L13.3061 7.10858V8.89144L14.102 9.87838C14.2358 10.0462 14.3155 10.2507 14.3307 10.4648C14.3458 10.6789 14.2957 10.8925 14.1869 11.0776L13.7624 11.8204C13.657 12.0025 13.4999 12.1492 13.3109 12.2418C13.1219 12.3344 12.9097 12.3687 12.7012 12.3404L11.449 12.1494L9.89958 13.0408L9.44326 14.2188C9.3663 14.4182 9.2309 14.5898 9.0548 14.711C8.87869 14.8322 8.67009 14.8973 8.45632 14.898H7.56489C7.35112 14.8973 7.14252 14.8322 6.96641 14.711C6.79031 14.5898 6.65491 14.4182 6.57795 14.2188L6.12163 13.0408L4.57224 12.1494L3.31999 12.3404C3.11148 12.3687 2.89926 12.3344 2.7103 12.2418C2.52134 12.1492 2.36417 12.0025 2.25877 11.8204L1.83428 11.0776C1.7255 10.8925 1.67539 10.6789 1.69055 10.4648C1.7057 10.2507 1.78542 10.0462 1.91918 9.87838L2.69387 8.89144V7.10858L1.89795 6.12164C1.7642 5.95379 1.68448 5.74932 1.66932 5.53523C1.65416 5.32114 1.70428 5.10748 1.81305 4.92246L2.23754 4.1796C2.34295 3.99748 2.50012 3.8508 2.68908 3.75821C2.87804 3.66562 3.09026 3.6313 3.29877 3.6596L4.55101 3.85062L6.12163 2.95919ZM5.87754 8.00001C5.87754 8.56292 6.10116 9.10277 6.49919 9.50081C6.89723 9.89884 7.43708 10.1225 7.99999 10.1225C8.5629 10.1225 9.10275 9.89884 9.50079 9.50081C9.89883 9.10277 10.1224 8.56292 10.1224 8.00001C10.1224 7.4371 9.89883 6.89725 9.50079 6.49921C9.10275 6.10118 8.5629 5.87756 7.99999 5.87756C7.43708 5.87756 6.89723 6.10118 6.49919 6.49921C6.10116 6.89725 5.87754 7.4371 5.87754 8.00001Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import { VTooltip } from 'floating-vue';
export default {
  directives: {
    tooltip: VTooltip
  }
};
</script>

<script lang="ts" name="Icons" setup>
const props = defineProps({
  type: String,
  handle: Function,
  tooltip: String
});
</script>

<style lang="scss">
.bitunix-tv-icons {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover svg path {
    stroke: var(--color-text-button);
  }

  &:hover svg rect {
    stroke: var(--color-text-button);
  }

  & svg path {
    stroke: var(--color-text-2);
  }

  & svg rect {
    stroke: var(--color-text-2);
  }
}
</style>
