<template>
    <div class="button_container">
        <button :disabled="disabled" @click="click">
            <slot />
        </button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppPrimaryButton extends Vue {
    @Prop({ required: false, default: false }) disabled!: boolean

    public click() {
        this.$emit('click')
    }
}
</script>
<style lang="stylus" scoped>
.button_container {
    display: inline-block;

    button {
        border: 0;
        border-radius: 5px;
        font-size: 16px;
        padding: 5px 30px;
        cursor: pointer;
        background-color: $CHILLNNBrightPinkColor
        color: #f8fbf8

        &:active {
            -webkit-transform: translate(0, 2px);
            -moz-transform: translate(0, 2px);
            transform: translate(0, 2px);
        }

        @media only screen and (max-width: $spSize) {
            font-size: 14px;
            padding: 5px 20px;
        }

        &:disabled {
            color: $borderColor;
            background-color: $shadowColor
        }
    }
}
</style>
