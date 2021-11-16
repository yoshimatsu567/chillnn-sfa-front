<template>
  <div v-show="isLoading" :class="{ _wrapper: true, _large: isLarge }">
    <img
        src="@/assets/img/loading/spinner-regular.svg"
        class="loading-icon"
    />
    <div class="stopper"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component({})
export default class Loading extends Vue {
    @Prop({ default: false }) public isLarge!: boolean
    public isLoading: boolean = false
    
    public start() {
        this.isLoading = true;
    }

    public finish() {
        this.isLoading = false;
    }
}
</script>

<style lang="stylus" scoped>
.loading-icon{
    animation: rotation 1.1s infinite;
    height: 30px;
    width: 30px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: 100;
}

._wrapper {
    text-align: center;

    &._large {
        margin-top: 150px;
        margin-bottom: 160px;
    }
}

.stopper{
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;
    background-color: alpha(white, 0.5);
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>